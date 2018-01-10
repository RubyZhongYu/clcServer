/********************
 *封装的响应模块
 *******************/

/*******
 *@description: 返回参数校验失败，状态码400，data为空，message为'参数校验失败''
 *@param: 		res为响应参数
 *@return:      
******/
exports.parameterFail = function (res) {
	var json = {};
	json.status = 400;
	json.data = {};
	json.message = '参数有误';
	console.log('******' + json.message);
	res.send(JSON.stringify(json));
};

exports.parameterPageFail = function (res) {
	var json = {};
	json.status = 400;
	json.data = {};
	json.message = 'page 必须为数字!';
	console.log('******' + json.message);
	res.send(JSON.stringify(json));
};

/*******
 *@description: 数据库操作异常，状态码300，data为空，message为'数据库操作异常'
 *@param: 		res为响应参数, err为错误参数
 *@return:      
******/
exports.databaseError = function (res, err) {
	var json = {};
	json.status = 300;
	json.data = {};
	json.message = '数据库操作异常';
	console.log('******' + err);
	res.send(JSON.stringify(json));
};

/*******
 *@description: 通用响应方法
 *@param: 		res为响应参数, statusCode为状态码，data为数据，message为信息
 *@return:      
******/
exports.common = function (res, statusCode, data, message) {
	var json = {};
	json.status = statusCode;
	json.data = data;
	json.message = message;
	res.send(JSON.stringify(json));
};

/*******
 *@description: oraclde数据集转json
 *@param: 		数据集, 流类型字段信息
 *@return: 	json元素组成的数组
 ******/

exports.oracleRowsToJson = function(data){
	var result = {};
    result.Rows = [];
    result.StreamField = [];
    result.Count = 0;
	if (data.metaData==null||data.rows==null){
		return;
	}
	for (var i=0;i<data.rows.length;i++){
		var newJson = new Object();
		for (var j=0;j<data.metaData.length;j++){
			var key = data.metaData[j].name;
			var dbType = data.metaData[j].dbType;
			var value = data.rows[i][j];
			if (value==null){
				//当为数值型，[值为空时，默认为0 其它默认为“”]
				value = dbType==2?0:"";
			}
			//if (value!=null&&typeof(value) == "object"){
            if (value!=null&&Buffer.isBuffer(value)){
				value = value.toString('base64');
                if (result.StreamField.indexOf(key)==-1){
                    result.StreamField.push(key);
                }
			}
			newJson[key] = value;
		}
		result.Rows.push(newJson);
	}
    result.Count = data.rows.length;
	return result;
}

/**
 * 数组拼接json树
 * @param  {Array} arr           数组
 * @param  {String} idStr        id字符串
 * @param  {String} pidStr       pid字符串
 * @param  {String} childrenStr  子字符串
 * @return {Array}               json元素组成的数组
 */
exports.transData = function(arr, idStr, pidStr, childrenStr){
	var result = {};
	result.Rows = [];
	result.StreamField = arr.StreamField;
	result.Count = arr.Rows.length;
	var hash = {}, id = idStr, pid = pidStr, children = childrenStr;
	for(var i = 0; i < result.Count; i++){
		hash[arr.Rows[i][id]] = arr.Rows[i];
		arr.Rows[i][children] = null;
	}
	for(var j = 0; j < result.Count; j++){
		var aVal = arr.Rows[j], hashVP = hash[aVal[pid]];
		if(hashVP){
			!hashVP[children] && (hashVP[children] = []);
			hashVP[children].push(aVal);
		}else{
			result.Rows.push(aVal);
		}
	}
	return result;
}