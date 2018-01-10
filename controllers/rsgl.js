var Oracle = require('../lib/db/oracle').clcApp;
var gFunc = require('../lib/utils/respond');

exports.getT45=function (req,res) {
	Oracle.query('select T4500,T4501,T4502 from T45',function(err,data){
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
				"message": "查询车型对应车间关系表成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}

exports.getTSZ29=function (req,res) {
	var json =JSON.parse(req.body.params);
	var t0700 = 0;
	if (json.Data.T0700!=null&&json.Data.T0700!=0){
		t0700 = json.Data.T0700;
	}
	var tsz2900 = 0;
	if (json.Data.TSZ2900!=null&&json.Data.TSZ2900!=0){
		tsz2900 = json.Data.TSZ2900;
	}
	var treeShow = false;
	if (json.Data.TreeShow!=null&&json.Data.TreeShow==1){
		treeShow = true;
	}
	var sql = '';
	var params = [];
	if (tsz2900!=0){
		sql = ' select  TSZ2900,trim(TSZ2901)as TSZ2901,trim(TSZ2902)as TSZ2902,TSZ2903,trim(TSZ2904)as TSZ2904,trim(TSZ2907)as TSZ2907,' +
			  ' trim(TSZ2905)as TSZ2905,trim(TSZ2906)as TSZ2906,TSZ2908,TSZ2910,TSZ2911,TSZ2912,TSZ2913,TSZ2914,trim(TSZ2915)as TSZ2915,' +
		   	  ' trim(TSZ2916)as TSZ2916,TSZ2917,TSZ2918,TSZ2919,TSZ2920,TSZ2921 from TSZ29 where TSZ2900=:TSZ2900';
		params = [tsz2900];
	}else{
		if (t0700!=0){
			sql = ' select  TSZ2900,trim(TSZ2901)as TSZ2901,trim(TSZ2902)as TSZ2902,TSZ2903,trim(TSZ2904)as TSZ2904,trim(TSZ2907)as TSZ2907,' +
			  	  ' trim(TSZ2905)as TSZ2905,trim(TSZ2906)as TSZ2906,TSZ2908,TSZ2910,TSZ2911,TSZ2912,TSZ2913,TSZ2914,trim(TSZ2915)as TSZ2915,' +
				  ' trim(TSZ2916)as TSZ2916,TSZ2917,TSZ2918,TSZ2919,TSZ2920,TSZ2921 from TSZ29 where TSZ2900 in(select T4502 from T45 where'+
				  ' T4501 in(select T0700 from T07 where T0700=:T0700 or T0706 like :T0706)) order by TSZ2900';
			params = [t0700,"%;"+t0700+";%"];
		}else{
			sql = ' select  TSZ2900,trim(TSZ2901)as TSZ2901,trim(TSZ2902)as TSZ2902,TSZ2903,trim(TSZ2904)as TSZ2904,trim(TSZ2907)as TSZ2907,' +
				  ' trim(TSZ2905)as TSZ2905,trim(TSZ2906)as TSZ2906,TSZ2908,TSZ2910,TSZ2911,TSZ2912,TSZ2913,TSZ2914,trim(TSZ2915)as TSZ2915,' +
				  ' trim(TSZ2916)as TSZ2916,TSZ2917,TSZ2918,TSZ2919,TSZ2920,TSZ2921 from TSZ29 order by TSZ2900';
			params = [];
		}
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
				"data": treeShow?gFunc.transData(gFunc.oracleRowsToJson(data), "TSZ2900", "TSZ2908", "Childs"):gFunc.oracleRowsToJson(data),
				"message": "查询单位成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}

exports.getTRS01=function (req,res) {
	var json =JSON.parse(req.body.params);
	if (json.Data.TSZ2900==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var tsz2900 = json.Data.TSZ2900

	var trs0100 = 0;
	if (json.Data.TRS0100!=null&&json.Data.TRS0100!=0){
		trs0100 = json.Data.TRS0100;
	}

	var sql = '';
	var params = [];
	if (trs0100!=0){
		sql = ' select TRS0100,TRS0101,trim(TRS0102)as TRS0102,trim(TRS0103)as TRS0103,TRS0104,TRS0105,TRS0106,trim(TRS0107)as TRS0107,' +
	   		  ' to_char(TRS0108,\'YYYY-MM-DD hh24:mi:ss\')as TRS0108,TRS0109,trim(TRS0110)as TRS0110,TRS0111,TRS0112,TRS0113,TRS0114,TRS0115,TRS0152,' +
			  ' TRS0116,TRS0117,to_char(TRS0118,\'YYYY-MM-DD hh24:mi:ss\')as TRS0118,TRS0119,to_char(TRS0120,\'YYYY-MM-DD hh24:mi:ss\')as TRS0120,TRS0122,' +
			  ' TRS0123,TRS0125,TRS0130,TRS0131,TRS0132,TRS0134,TRS0135,TRS0136,TRS0137,TRS0140,trim(TRS0142)as TRS0142,to_char(TRS0143,\'YYYY-MM-DD hh24:mi:ss\')as TRS0143,' +
			  ' TRS0145,to_char(TRS0146,\'YYYY-MM-DD hh24:mi:ss\')as TRS0146,TRS0147,TRS0148,TRS0149,TRS0155,TRS0156,TRS0157,TRS0158,trim(TRS0159)as TRS0159,' +
			  ' to_char(TRS0160,\'YYYY-MM-DD hh24:mi:ss\')as TRS0160,to_char(TRS0161,\'YYYY-MM-DD hh24:mi:ss\')as TRS0161,to_char(TRS0162,\'YYYY-MM-DD hh24:mi:ss\')as TRS0162,' +
			  ' TRS0139,TRS0151,TRS0121,TRS0163,TRS0164,TRS0133,to_char(TRS0126,\'YYYY-MM-DD hh24:mi:ss\')as TRS0126,to_char(TRS0127,\'YYYY-MM-DD hh24:mi:ss\')as TRS0127,TRS0128,' +
			  ' TRS0165,TRS0166,TRS0167,TRS0168,TRS0169,TRS0170,TRS0124,TRS0171,TRS0172,TRS0129,TRS0173,TRS0174,TRS0175,to_char(TRS0176,\'YYYY-MM-DD hh24:mi:ss\')as TRS0176,TRS0177'+
			  ' from TRS01 where TRS0100=:TRS0100';
		params = [trs0100];
	}else{
		sql = ' select TRS0100,TRS0101,trim(TRS0102)as TRS0102,trim(TRS0103)as TRS0103,TRS0104,TRS0105,TRS0106,trim(TRS0107)as TRS0107,' +
			' to_char(TRS0108,\'YYYY-MM-DD hh24:mi:ss\')as TRS0108,TRS0109,trim(TRS0110)as TRS0110,TRS0111,TRS0112,TRS0113,TRS0114,TRS0115,TRS0152,' +
			' TRS0116,TRS0117,to_char(TRS0118,\'YYYY-MM-DD hh24:mi:ss\')as TRS0118,TRS0119,to_char(TRS0120,\'YYYY-MM-DD hh24:mi:ss\')as TRS0120,TRS0122,' +
			' TRS0123,TRS0125,TRS0130,TRS0131,TRS0132,TRS0134,TRS0135,TRS0136,TRS0137,TRS0140,trim(TRS0142)as TRS0142,to_char(TRS0143,\'YYYY-MM-DD hh24:mi:ss\')as TRS0143,' +
			' TRS0145,to_char(TRS0146,\'YYYY-MM-DD hh24:mi:ss\')as TRS0146,TRS0147,TRS0148,TRS0149,TRS0155,TRS0156,TRS0157,TRS0158,trim(TRS0159)as TRS0159,' +
			' to_char(TRS0160,\'YYYY-MM-DD hh24:mi:ss\')as TRS0160,to_char(TRS0161,\'YYYY-MM-DD hh24:mi:ss\')as TRS0161,to_char(TRS0162,\'YYYY-MM-DD hh24:mi:ss\')as TRS0162,' +
			' TRS0139,TRS0151,TRS0121,TRS0163,TRS0164,TRS0133,to_char(TRS0126,\'YYYY-MM-DD hh24:mi:ss\')as TRS0126,to_char(TRS0127,\'YYYY-MM-DD hh24:mi:ss\')as TRS0127,TRS0128,' +
			' TRS0165,TRS0166,TRS0167,TRS0168,TRS0169,TRS0170,TRS0124,TRS0171,TRS0172,TRS0129,TRS0173,TRS0174,TRS0175,to_char(TRS0176,\'YYYY-MM-DD hh24:mi:ss\')as TRS0176,TRS0177'+
			' from TRS01 where TRS0101 in(select TSZ2900 from TSZ29 where TSZ2900=:TSZ2900 or TSZ2917 like :TSZ2917)';
		params = [tsz2900,"%;"+tsz2900+";%"];
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
				"data": gFunc.oracleRowsToJson(data),
				"message": "查询人员信息成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}