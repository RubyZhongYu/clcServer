var Oracle = require('../lib/db/oracle').clcApp;
var gFunc = require('../lib/utils/respond');
var fs=require('fs');

var testQuery=function(){
	Oracle.query('select * from T34',function(err,data){
		if (err){
			console.log(err);
			return;
		}
		console.log(data);
	});
}

var testBlob=function(){
	Oracle.query('select T3951,T3953 from t39 where t3900=754813',function(err,data){
		var blob = data.rows[0][0];
		var str = blob.toString('base64');
		fs.writeFile('c:/1.jpg',blob,function(err){
			if (err){
				console.log(err);
			}
			console.log('ok1');
			fs.writeFile('c:/1.txt',str,function(err){
				if (err){
					console.log(err);
				}
				console.log('ok2');
			});
		});
	});
}

var str ='{"Data":{"TFJ0201":204471,"TFJ0203":"","TFJ0204":11523,"TFJ0205":1080298,"TFJ0206":"轴温分线","TFJ0208":-1,"TFJ0209":"1000200006","TFJ0211":1,"TFJ0212":-1,"TFJ0213":0,"TFJ0214":123,"TFJ0216":4,"TFJ0217":0,"TFJ0218":0,"TFJ0220":"3","TFJ0227":4,"TFJ0228":"JxF3-1TA","TFJ0232":1,"TFJ0233":"组","TFJ0234":0,"TFJ0235":0,"TFJ0236":0,"TFJ0237":0,"TFJ0238":0,"TFJ0239":0,"TFJ0240":"个","TFJ0241":0,"TFJ0243":0,"TFJ0244":"","TFJ0249":0,"TFJ0250":0,"TFJ0251":0,"TFJ0253":"105","TFJ0254":123,"TFJ0255":"","TFJ0260":0,"TFJ0263":0,"TFJ0264":0,"TFJ0265":0,"TFJ0266":0,"TFJ0269":0,"TFJ0270":0,"TFJ0276":"","TFJ0277":"","TFJ0278":""}}';

var json = JSON.parse(str);
console.log(json);