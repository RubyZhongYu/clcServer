var Oracle = require('../lib/db/oracle').clcApp;
var gFunc = require('../lib/utils/respond');

exports.query=function (req,res) {
	var json =JSON.parse(req.body.params);
	if (json.Data.SQL==null||json.Data.SQL==''){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var sql = json.Data.SQL;
	var treeShow = false;
	if (json.Data.TreeShow!=null&&json.Data.TreeShow==1){
		treeShow = true;
	}
	var PK='';
	if (json.Data.PK!=null&&json.Data.PK!=''){
		PK = json.Data.PK;
	}
	var PID='';
	if (json.Data.PID!=null&&json.Data.PID!=''){
		PID = json.Data.PID;
	}
	Oracle.query(sql,function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
		}else{
			var result = {
				"data": treeShow&&PK!=''&&PID!=''?gFunc.transData(gFunc.oracleRowsToJson(data), PK, PID, "Childs"):gFunc.oracleRowsToJson(data),
				"message": "查询成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}

exports.queryParams=function (req,res) {
	var json =JSON.parse(req.body.params);
	if (json.Data.SQL==null||json.Data.SQL==''||json.Data.Params==null||json.Data.Params==''){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var sql = json.Data.SQL;
	var params = json.Data.Params.split(',');
	var treeShow = false;
	if (json.Data.TreeShow!=null&&json.Data.TreeShow==1){
		treeShow = true;
	}
	var PK='';
	if (json.Data.PK!=null&&json.Data.PK!=''){
		PK = json.Data.PK;
	}
	var PID='';
	if (json.Data.PID!=null&&json.Data.PID!=''){
		PID = json.Data.PID;
	}
	Oracle.queryParam(sql,params,function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
		}else{
			var result = {
				"data": treeShow&&PK!=''&&PID!=''?gFunc.transData(gFunc.oracleRowsToJson(data), PK, PID, "Childs"):gFunc.oracleRowsToJson(data),
				"message": "查询成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}