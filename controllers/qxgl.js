var Oracle = require('../lib/db/oracle').clcApp;
var gFunc = require('../lib/utils/respond');

exports.getS01=function (req,res) {
	var sql = 'select S0100,trim(S0101)as S0101,trim(S0102)as S0102,S0103,S0104,S0105,S0106,S0107,trim(S0108)as S0108 from S01 order by S0100';
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
				"data": gFunc.oracleRowsToJson(data),
				"message": "查询用户信息成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}