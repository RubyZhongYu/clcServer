var carPhotoPath = require('../config').CarPhotoPath;
var jcdPhotoMbPath = require('../config').JcdPhotoMbPath;
var jcdPhotoPath = require('../config').JcdPhotoPath;
var fsComm = require('../lib/utils/fsComm');
var fs=require('fs');
var Oracle = require('../lib/db/oracle').clcApp;

exports.addClzp=function (req,res) {
	//{"Data":{"TFJ5100":0,"TFJ5103":"","TFJ5106":0,"TFJ5101":0,"TFJ5102":0}}
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ5100==null||json.Data.TFJ5103==null||json.Data.TFJ5106==null||json.Data.TFJ5101==null||json.Data.TFJ5102==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var filePath = carPhotoPath + json.Data.TFJ5106 + '/' + json.Data.TFJ5101 +'/'+ json.Data.TFJ5102 + '/' + json.Data.TFJ5100 + '.JPG';
	var fileDir = carPhotoPath + json.Data.TFJ5106 + '/' + json.Data.TFJ5101 +'/'+ json.Data.TFJ5102;
	var tfj5100 = json.Data.TFJ5100;
	fsComm.createDirsSync(fileDir,'/',function(err){
		if (err){
			console.log(err);
			var result = {
				"data": {},
				"message": err,
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		var imgBuff = new Buffer(json.Data.TFJ5103,'base64');
		fs.writeFile(filePath,imgBuff,function(err){
			if (err){
				console.log(err);
				var result = {
					"data": {},
					"message": "保存文件失败："+ err,
					"status": 201
				}
				res.send(JSON.stringify(result));
				return;
			}
			var sql = 'update TFJ51 set TFJ5107=sysdate where TFJ5100=:TFJ5100';
			Oracle.queryParam(sql,[tfj5100],function(err){
				if (err){
					console.log(err);
				}
				var result = {
					"data": {},
					"message": "保存文件成功!",
					"status": 200
				}
				res.send(JSON.stringify(result));
				return;
			});
		});
	});
}

exports.delClzp=function (req,res) {
	//{"Data":{"TFJ5100":0,"TFJ5103":"","TFJ5106":0,"TFJ5101":0,"TFJ5102":0}}
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ5100==null||json.Data.TFJ5106==null||json.Data.TFJ5101==null||json.Data.TFJ5102==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var filePath = carPhotoPath + json.Data.TFJ5106 + '/' + json.Data.TFJ5101 +'/'+ json.Data.TFJ5102 + '/' + json.Data.TFJ5100 + '.JPG';

	fs.exists(filePath, function (exists) {
		if (exists) {
			fs.unlink(filePath,function(err){
				if (err){
					var result = {
						"data": {},
						"message": "删除失败："+ err,
						"status": 201
					}
					res.send(JSON.stringify(result));
					return;
				} else{
					var result = {
						"data": {},
						"message": "删除成功!",
						"status": 200
					}
					res.send(JSON.stringify(result));
					return;
				}
			});
		}else{
			var result = {
				"data": {},
				"message": "删除成功(文件不存在)!",
				"status": 200
			}
			res.send(JSON.stringify(result));
			return;
		}
	});
}

exports.addTFJ29=function (req,res) {
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ2900==null||json.Data.Photo==null||json.Data.TFJ2901==null||json.Data.TFJ2905==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var filePath = jcdPhotoMbPath + json.Data.TFJ2901 + '/' + json.Data.TFJ2905 +'/'+ json.Data.TFJ2900 + '.JPG';
	var fileDir = jcdPhotoMbPath + json.Data.TFJ2901 + '/' + json.Data.TFJ2905;
	var tfj2900 = json.Data.TFJ2900;
	fsComm.createDirsSync(fileDir,'/',function(err){
		if (err){
			console.log(err);
			var result = {
				"data": {},
				"message": err,
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		var imgBuff = new Buffer(json.Data.Photo,'base64');
		fs.writeFile(filePath,imgBuff,function(err){
			if (err){
				console.log(err);
				var result = {
					"data": {},
					"message": "保存文件失败："+ err,
					"status": 201
				}
				res.send(JSON.stringify(result));
				return;
			}
			var sql = 'update TFJ29 set TFJ2904=sysdate where TFJ2900=:TFJ2900';
			Oracle.queryParam(sql,[tfj2900],function(err){
				if (err){
					console.log(err);
				}
				var result = {
					"data": {},
					"message": "保存文件成功!",
					"status": 200
				}
				res.send(JSON.stringify(result));
				return;
			});
		});
	});
}

exports.delTFJ29=function (req,res) {
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ2900==null||json.Data.TFJ2901==null||json.Data.TFJ2905==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var filePath = jcdPhotoMbPath + json.Data.TFJ2901 + '/' + json.Data.TFJ2905 +'/' + json.Data.TFJ2900 + '.JPG';

	fs.exists(filePath, function (exists) {
		if (exists) {
			fs.unlink(filePath,function(err){
				if (err){
					var result = {
						"data": {},
						"message": "删除失败："+ err,
						"status": 201
					}
					res.send(JSON.stringify(result));
					return;
				} else{
					var result = {
						"data": {},
						"message": "删除成功!",
						"status": 200
					}
					res.send(JSON.stringify(result));
					return;
				}
			});
		}else{
			var result = {
				"data": {},
				"message": "删除成功(文件不存在)!",
				"status": 200
			}
			res.send(JSON.stringify(result));
			return;
		}
	});
}
exports.getTFJ29=function(req,res) {
	var json = JSON.parse(req.body.params);
	var updateTime = '1899-01-01 01:01:01';
	if (json.UpdateTime!=null&&json.UpdateTime!=''){
		updateTime = json.UpdateTime;
	}
	var sql = 'select TFJ2900,TFJ2901,TFJ2902,TFJ2903,to_char(TFJ2904,\'YYYY-MM-DD hh24:mi:ss\') as TFJ2904,TFJ2905 from TFJ29 where TFJ2904 > to_date(:TFJ2904,\'YYYY-MM-DD hh24:mi:ss\')';
	var params = [updateTime];
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
				"data": gFunc.oracleRowsToJson(data),
				"message": "查询车辆外观照片模板成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}

exports.getTFJ29PhotoBase64=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ2900==null||json.Data.TFJ2901==null||json.Data.TFJ2905==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var filePath = jcdPhotoMbPath + json.Data.TFJ2901 + '/' + json.Data.TFJ2905 +'/' + json.Data.TFJ2900 + '.JPG';

	fs.exists(filePath, function (exists) {
		if (exists) {
			var data = fs.readFileSync(filePath);
			var photoBase64 = new Buffer(data).toString('base64');
			var result = {
				"data": {"PhotoBase64": photoBase64},
				"message": "获取成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
			return;
		}else{
			var result = {
				"data": {},
				"message": "文件不存在!",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
	});
}

exports.getTFJ30=function(req,res){
	var json = JSON.parse(req.body.params);
	if (json.Data.T0200==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var t0200 = json.Data.T0200;
	var updateTime = '1899-01-01 01:01:01';
	if (json.UpdateTime!=null&&json.UpdateTime!=''){
		updateTime = json.UpdateTime;
	}
	var sql = 'select TFJ3000,TFJ3001,TFJ3002,TFJ3003,TFJ3004,to_char(TFJ3005,\'YYYY-MM-DD hh24:mi:ss\')as TFJ3005,TFJ3006 from TFJ30 where TFJ3001=:TFJ3001 and TFJ3005 > to_date(:TFJ3005,\'YYYY-MM-DD hh24:mi:ss\')';
	var params = [t0200,updateTime];
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
				"data": gFunc.oracleRowsToJson(data),
				"message": "查询车辆外观照片成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}

exports.getTFJ30PhotoBase64=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ3000==null||json.Data.TFJ3001==null||json.Data.TFJ3002==null||json.Data.TFJ3003==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var filePath = jcdPhotoMbPath + json.Data.TFJ3001 + '/' + json.Data.TFJ3002 +'/' + json.Data.TFJ3003 +'/' +json.Data.TFJ3000 + '.JPG';

	fs.exists(filePath, function (exists) {
		if (exists) {
			var data = fs.readFileSync(filePath);
			var photoBase64 = new Buffer(data).toString('base64');
			var result = {
				"data": {"PhotoBase64": photoBase64},
				"message": "获取成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
			return;
		}else{
			var result = {
				"data": {},
				"message": "文件不存在!",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
	});
}

exports.insertTFJ30=function(req,res){
	//json: {"Data":{"Photo":"","PhotoName":"","PhotoMemo":"","T0200":0,"T3400":0,"TSZ2900":0}}
	var json =JSON.parse(req.body.params);
	if (json.Data.Photo==null||json.Data.PhotoName==null||json.Data.T0200==null||json.Data.T3400==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var photo = json.Data.Photo;
	var photoName = json.Data.PhotoName;
	var t0200 = json.Data.T0200;
	var t3400 = json.Data.T3400;
	var photoMemo = '';
	if (json.Data.PhotoMemo!=null&&json.Data.PhotoMemo!=''){
		photoMemo = json.Data.PhotoMemo;
	}
	var tsz2900 = 123;
	if (json.Data.TSZ2900!=null&&json.Data.TSZ2900!=''&&json.Data.TSZ2900!='0'&&json.Data.TSZ2900!=0){
		tsz2900 = json.Data.TSZ2900;
	}
	var sql = 'select SQ_TFJ30.NextVal as TFJ3000 from dual';
	Oracle.query(sql,function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		var tfj3000=data.rows[0][0];
		var sql = ' insert into TFJ30(TFJ3000,TFJ3001,TFJ3002,TFJ3003,TFJ3004,TFJ3005,TFJ3006)'+
			' values(:TFJ3000,:TFJ3001,:TFJ3002,:TFJ3003,:TFJ3004,sysdate,:TFJ3006)';
		var params = [tfj3000,t0200,t3400,tsz2900,photoName,photoMemo];
		Oracle.queryParam(sql,params,function(err){
			if (err){
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			var imgBuff = new Buffer(photo,'base64');
			var filePath = jcdPhotoPath + t0200 + '/' + t3400 +'/' + tsz2900 +'/' + tfj3000 + '.JPG';
			var fileDir = jcdPhotoPath + t0200 + '/' + t3400 +'/' + tsz2900;
			fsComm.createDirsSync(fileDir,'/',function(err) {
				if (err) {
					console.log(err);
					var result = {
						"data": {},
						"message": err,
						"status": 201
					}
					res.send(JSON.stringify(result));
					return;
				}
				fs.writeFile(filePath,imgBuff,function(err){
					if (err){
						console.log(err);
					}
					var result = {
						"data": {"ErpID":tfj3000},
						"message": "添加成功！",
						"status": 200
					}
					res.send(JSON.stringify(result));
				});
			});
		});
	});
}

exports.updateTFJ30=function(req,res){
	var json =JSON.parse(req.body.params);
	//{"Data":{"TFJ3000":0,"Photo":"","PhotoName":"","PhotoMemo":""}}
	if (json.Data.Photo==null||json.Data.TFJ3004==null||json.Data.TFJ3006==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var photo = json.Data.Photo;
	var tfj3004 = json.Data.TFJ3004;
	var tfj3000 = json.Data.TFJ3000;
	var tfj3006 = '';
	if (json.Data.TFJ3006!=null&&json.Data.TFJ3006!=''){
		tfj3006 = json.Data.TFJ3006;
	}
	var sql = 'update TFJ30 set TFJ3004=:TFJ3004,TFJ3005=sysdate,TFJ3006=(case when :TFJ3006 =\'\' then TFJ3006 else :TFJ3006 end) where TFJ3000=:TFJ3000';
	var params = [tfj3004,tfj3006,tfj3006,tfj3000];
	Oracle.queryParam(sql,params,function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		var sql = 'select TFJ3001,TFJ3002,TFJ3003 from TFJ30 where TFJ3000=:TFJ3000';
		Oracle.queryParam(sql,[tfj3000],function(err,data){
			if (err){
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			if (data.length<1){
				var result = {
					"data": {},
					"message": "记录不存在！",
					"status": 201
				}
				res.send(JSON.stringify(result));
				return;
			}
			var imgBuff = new Buffer(photo,'base64');
			var t0200 = data.rows[0][0];
			var t3400 = data.rows[0][1];
			var tsz2900 = data.rows[0][2];
			var filePath = jcdPhotoPath + t0200 + '/' + t3400 +'/' + tsz2900 +'/' + tfj3000 + '.JPG';
			fs.writeFile(filePath,imgBuff,function(err){
				if (err){
					console.log(err);
				}
				var result = {
					"data": {},
					"message": "修改成功！",
					"status": 200
				}
				res.send(JSON.stringify(result));
			});
		});
	});
}

exports.deleteTFJ30=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ3000==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var tfj3000=json.Data.TFJ3000;
	var sql = 'select TFJ3001,TFJ3002,TFJ3003 from TFJ30 where TFJ3000=:TFJ3000';
	Oracle.queryParam(sql,[tfj3000],function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.length<1){
			var result = {
				"data": {},
				"message": "记录不存在！",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		var t0200 = data.rows[0][0];
		var t3400 = data.rows[0][1];
		var tsz2900 = data.rows[0][2];
		var sql = 'delete TFJ30 where TFJ3000=:TFJ3000';
		Oracle.queryParam(sql,[tfj3000],function(err){
			if (err){
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			var filePath = jcdPhotoPath + t0200 + '/' + t3400 +'/' + tsz2900 +'/' + tfj3000 + '.JPG';
			fs.exists(filePath, function (exists) {
				if (exists) {
					fs.unlink(filePath,function(err){
						if (err){
							console.log(err);
						}
						var result = {
							"data": {},
							"message": "删除成功!",
							"status": 200
						}
						res.send(JSON.stringify(result));
						return;
					});
				}else{
					var result = {
						"data": {},
						"message": "删除成功(文件不存在)!",
						"status": 200
					}
					res.send(JSON.stringify(result));
					return;
				}
			});
		});
	});
}

exports.getTFJ51=function(req,res){
	var json = JSON.parse(req.body.params);
	if (json.Data.T0200==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var t0200 = json.Data.T0200;
	var updateTime = '1899-01-01 01:01:01';
	if (json.UpdateTime!=null&&json.UpdateTime!=''){
		updateTime = json.UpdateTime;
	}
	var sql = 'select TFJ5100,TFJ5101,TFJ5102,TFJ5104,TFJ5105,to_char(TFJ5107,\'YYYY-MM-DD hh24:mi:ss\')as TFJ5107 from TFJ51 where TFJ5106=:TFJ5106 and TFJ5107 > to_date(:TFJ5107,\'YYYY-MM-DD hh24:mi:ss\')';
	var params = [t0200,updateTime];
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
				"data": gFunc.oracleRowsToJson(data),
				"message": "查询车辆照片成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}

exports.insertTFJ51=function(req,res){
	//json: {"Data":{"Photo":"","PhotoName":"","PhotoMemo":"","T0200":0,"T3400":0,"TSZ2900":0}}
	var json =JSON.parse(req.body.params);
	if (json.Data.Photo==null||json.Data.PhotoName==null||json.Data.T0200==null||json.Data.T3400==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var photo = json.Data.Photo;
	var photoName = json.Data.PhotoName;
	var t0200 = json.Data.T0200;
	var t3400 = json.Data.T3400;
	var photoMemo = '';
	if (json.Data.PhotoMemo!=null&&json.Data.PhotoMemo!=''){
		photoMemo = json.Data.PhotoMemo;
	}
	var tsz2900 = 123;
	if (json.Data.TSZ2900!=null&&json.Data.TSZ2900!=''&&json.Data.TSZ2900!='0'&&json.Data.TSZ2900!=0){
		tsz2900 = json.Data.TSZ2900;
	}
	var sql = 'select SQ_TFJ51.NextVal as TFJ5100 from dual';
	Oracle.query(sql,function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		var tfj5100=data.rows[0][0];
		var sql = ' insert into TFJ51(TFJ5100,TFJ5101,TFJ5102,TFJ5104,TFJ5105,TFJ5106,TFJ5107)'+
			' values(:TFJ5100,:TFJ5101,:TFJ5102,:TFJ5104,:TFJ5105,:TFJ5106,sysdate)';
		var params = [tfj5100,t3400,tsz2900,photoName,photoMemo,t0200];
		Oracle.queryParam(sql,params,function(err){
			if (err){
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			var imgBuff = new Buffer(photo,'base64');
			var filePath = carPhotoPath + t0200 + '/' + t3400 +'/' + tsz2900 +'/' + tfj5100 + '.JPG';
			var fileDir = carPhotoPath + t0200 + '/' + t3400 +'/' + tsz2900;
			fsComm.createDirsSync(fileDir,'/',function(err) {
				if (err) {
					console.log(err);
					var result = {
						"data": {},
						"message": err,
						"status": 201
					}
					res.send(JSON.stringify(result));
					return;
				}
				fs.writeFile(filePath,imgBuff,function(err){
					if (err){
						console.log(err);
					}
					var result = {
						"data": {"ErpID":tfj5100},
						"message": "添加成功！",
						"status": 200
					}
					res.send(JSON.stringify(result));
				});
			});
		});
	});
}

exports.updateTFJ51=function(req,res){
	var json =JSON.parse(req.body.params);
	//{"Data":{"TFJ5100":0,"Photo":"","PhotoName":"","PhotoMemo":""}}
	if (json.Data.Photo==null||json.Data.TFJ5100==null||json.Data.TFJ5104==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var photo = json.Data.Photo;
	var tfj5100 = json.Data.TFJ5100;
	var tfj5104 = json.Data.TFJ5104;
	var tfj5105 = '';
	if (json.Data.TFJ5105!=null&&json.Data.TFJ5105!=''){
		tfj5105 = json.Data.TFJ5105;
	}
	var sql = 'update TFJ51 set TFJ5104=:TFJ5104,TFJ5107=sysdate,TFJ5105=(case when :TFJ5105 =\'\' then TFJ5105 else :TFJ5105 end) where TFJ5100=:TFJ5100';
	var params = [tfj5104,tfj5105,tfj5105,tfj5100];
	Oracle.queryParam(sql,params,function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		var sql = 'select TFJ5106,TFJ5101,TFJ5102 from TFJ51 where TFJ5100=:TFJ5100';
		Oracle.queryParam(sql,[tfj5100],function(err,data){
			if (err){
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			if (data.length<1){
				var result = {
					"data": {},
					"message": "记录不存在！",
					"status": 201
				}
				res.send(JSON.stringify(result));
				return;
			}
			var imgBuff = new Buffer(photo,'base64');
			var t0200 = data.rows[0][0];
			var t3400 = data.rows[0][1];
			var tsz2900 = data.rows[0][2];
			var filePath = carPhotoPath + t0200 + '/' + t3400 +'/' + tsz2900 +'/' + tfj5100 + '.JPG';
			fs.writeFile(filePath,imgBuff,function(err){
				if (err){
					console.log(err);
				}
				var result = {
					"data": {},
					"message": "修改成功！",
					"status": 200
				}
				res.send(JSON.stringify(result));
			});
		});
	});
}

exports.deleteTFJ51=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ5100==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var tfj5100=json.Data.TFJ5100;
	var sql = 'select TFJ5106,TFJ5101,TFJ5102 from TFJ51 where TFJ5100=:TFJ5100';
	Oracle.queryParam(sql,[tfj5100],function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.length<1){
			var result = {
				"data": {},
				"message": "记录不存在！",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		var t0200 = data.rows[0][0];
		var t3400 = data.rows[0][1];
		var tsz2900 = data.rows[0][2];
		var sql = 'delete TFJ51 where TFJ5100=:TFJ5100';
		Oracle.queryParam(sql,[tfj5100],function(err){
			if (err){
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			var filePath = carPhotoPath + t0200 + '/' + t3400 +'/' + tsz2900 +'/' + tfj5100 + '.JPG';
			fs.exists(filePath, function (exists) {
				if (exists) {
					fs.unlink(filePath,function(err){
						if (err){
							console.log(err);
						}
						var result = {
							"data": {},
							"message": "删除成功!",
							"status": 200
						}
						res.send(JSON.stringify(result));
						return;
					});
				}else{
					var result = {
						"data": {},
						"message": "删除成功(文件不存在)!",
						"status": 200
					}
					res.send(JSON.stringify(result));
					return;
				}
			});
		});
	});
}

exports.getTFJ51PhotoBase64=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ5100==null||json.Data.TFJ5106==null||json.Data.TFJ5101==null||json.Data.TFJ5102==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var filePath = carPhotoPath + json.Data.TFJ5106 + '/' + json.Data.TFJ5101 +'/' + json.Data.TFJ5102 +'/' +json.Data.TFJ5100 + '.JPG';

	fs.exists(filePath, function (exists) {
		if (exists) {
			var data = fs.readFileSync(filePath);
			var photoBase64 = new Buffer(data).toString('base64');
			var result = {
				"data": {"PhotoBase64": photoBase64},
				"message": "获取成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
			return;
		}else{
			var result = {
				"data": {},
				"message": "文件不存在!",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
	});
}