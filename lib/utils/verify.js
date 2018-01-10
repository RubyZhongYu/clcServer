/************************************
 *参数校验公用模块
 ***********************************/

var validators = require('validators');

/*******
 *@description: 参数是否为空
 *@param: 		 str输入的字符串
 *@return:      true表示输入参数为空
 ******/
exports.isEmpty = function (str) {
	//空引用、空字符串、空输入
	return str == null || typeof str == "undefined" || str.trim() == "" ? true: false;
};

/*******
 *@description: 数字类型验证
 *@param: 		str输入参数
 *@return:      true表示输入参数为数字，false为非数字
 ******/
exports.isNumber = function (str) {
	return !isNaN(str);
};

/*******
 *@description: 是否为数组
 *@param: 		str输入参数
 *@return:      
 ******/
 exports.isArray = function (str) {
 	return str.constructor == Array;
 };

 /*******
  *@description: 是否为对象
  *@param: 		 str输入参数
  *@return:      
  ******/
exports.isObject = function (str) {
	return str.constructor == Object;
};

/*******
 *@description: 是否为字符串
 *@param: 		 str输入参数
 *@return:      
 ******/
exports.isString = function (str) {
	return str.constructor == String;
};

/*******
 *@description: 是否为Boolean
 *@param: 		 str输入参数
 *@return:      
 ******/
exports.isBoolean = function (str) {
	return str.constructor == Boolean;
};

/*******
 *@description: 是否为某个类的实例
 *@param: 		 str输入参数, className为类名
 *@return:      
 ******/
exports.isClassOfExample = function (str, className) {
	return str.constructor == className;
};

/*******
 *@description: 是否为空对象（不包含继承自原型链）
 *@param: 		obj为对象
 *@return:      
 ******/
exports.isOwnEmptyObject = function (obj) {
	for(var key in obj){
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
};

/*******
 *@description: 判断str是否为Json(经过JSON.parse()转化过的)
 *@param: 		str是字符串经过JSON.parse转换过的
 *@return:      
 ******/
exports.isJson = function (str) {
	if (validators.isJSON(str)) {
		return true;	
	} 
	else{
		return false;
	}
};

/*******
 *@description: 判断传入的参数的长度是否在给定的有效范围内
 *@param: 		 str为字符串， minL为最小长度, maxL为最大长度
 *@return:      true表示符合判断条件
 ******/
exports.isAvaiableLength = function (minL, maxL, str) {
	return (str.length >= minL && str.length <= maxL)? true: false;
};


/*******
 *@description: 去除空格
 *@param: 	    str为原字符串,style为去除空格类型，0位去除左边，1位去除右边，
				2位去除所有，其余为去除两边
 *@return:      去除空格后的字符串
 ******/
exports.removeSpace = function (str, style) {
   	switch(style){
   		case 0 : //去除左边的空格
   			return str.replace(/(^\s*)/g, '');
   			break;
   		case 1 : //去除右边的空格
   			return str.replace(/(\s*$)/g, '');
   			break;
   		case 2 : //去除所有空格
   			return str.replace(/(\s*)/g, '');
   			break;
   		default: //去除两边空格
   			return str.replace(/(^\s*) | (\s*$)/g, '');
   	}
};




/*******
 *@description: 截取指定长度的字符串
 *@param: 		str为字符串，len为要截取的长度(中文一个字符两个字节)
 *@return:      
 ******/
exports.cutStr = function (str, len) {
	var temp;
	var iCount = 0;
	var patrn = /[^\x00-\xff]/g; //中文字符匹配
	var strRs = '';

	for(var k = 0; k < str.length; k++){
		if (iCount < len) {
			temp = str.substr(k, i);
			if (temp.match(patrn) == null) {
				iCount = iCount + 1;
			}
			else{
				iCount = iCount + 2;
			}
			strRs += temp;
		}
		else{
			break;
		}
	}

	return strRs + '...';
};

/*******
 *@description: 指定长度，不够在前方补0
 *@param: 		num 数字，len 长度
 *@return:      
 ******/
exports.prefixInteger = function (num, len) {
 return (Array(len).join('0') + num).slice(-len);
}