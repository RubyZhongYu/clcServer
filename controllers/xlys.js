/*细录预算模块*/
var Oracle = require('../lib/db/oracle').clcApp;
var gFunc = require('../lib/utils/respond');

exports.getT34=function (req,res) {
    var json =JSON.parse(req.body.params);
    if (json.Data.T0700==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var t0700 = json.Data.T0700;
    var sql = 'select T3400,trim(T3401)as T3401,trim(T3402)as T3402,T3404,T3405,T3406 from T34 where T3403=:T0700 order by T3401';
    var params = [t0700];
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
                "message": "查询检修部位成功!",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}

exports.getT40=function (req,res) {
    var json =JSON.parse(req.body.params);
    if (json.Data.T0700==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var t0700 = json.Data.T0700;
    var t3400 = 0;
    if (json.Data.T3400!=null&&json.Data.T3400!=0){
        t3400 = json.Data.T3400;
    }
    var treeShow = false;
    if (json.Data.TreeShow!=null&&json.Data.TreeShow==1){
        treeShow = true;
    }
    var sql = '';
    var params = '';
    if (t3400!=0){
        sql = 'select T4000,T4001,trim(T4002)as T4002,trim(T4003)as T4003,T4004,T4005,T4006,T4007,T4008,T4009,T4010 from T40 where T4001=:T4001 order by T4004,T4000';
        params = [t3400];
    }else{
        sql = 'select T4000,T4001,trim(T4002)as T4002,trim(T4003)as T4003,T4004,T4005,T4006,T4007,T4008,T4009,T4010 from T40 where T4001 in(select T3400 from T34 where T3403=:T0700) order by T4004,T4000';
        params = [t0700];
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
                "data": treeShow?gFunc.transData(gFunc.oracleRowsToJson(data), "T4000", "T4004", "Childs"):gFunc.oracleRowsToJson(data),
                "message": "查询检修部位成功!",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}

exports.getT73=function (req,res) {
	var json =JSON.parse(req.body.params);
	if (json.Data.T0700==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var t0700 = json.Data.T0700;
	var t3400 = 0;
	if (json.Data.T3400!=null&&json.Data.T3400!=0){
		t3400 = json.Data.T3400;
	}
	var treeShow = false;
	if (json.Data.TreeShow!=null&&json.Data.TreeShow==1){
		treeShow = true;
	}
	var sql = '';
	var params = '';
	if (t3400!=0){
		sql = 'select T7300,T7301,T7302,trim(T7303)as T7303,T7304,T7305,T7306,T7307 from T73 where T7301=:T7301 and T7302=:T7302 order by T7304,T7300';
		params = [t0700,t3400];
	}else{
		sql = 'select T7300,T7301,T7302,trim(T7303)as T7303,T7304,T7305,T7306,T7307 from T73 where T7301=:T7301 order by T7304,T7300';
		params = [t0700];
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
				"data": treeShow?gFunc.transData(gFunc.oracleRowsToJson(data), "T7300", "T7304", "Childs"):gFunc.oracleRowsToJson(data),
				"message": "查询检修部位成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}

exports.getT39=function (req,res) {
    var json =JSON.parse(req.body.params);
    if (json.Data.T4000==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var t4000 = json.Data.T4000;
    var t3900 = 0;
    if (json.Data.T3900!=null&&json.Data.T3900!=0){
        t3900 = json.Data.T3900;
    }
    var sql = '';
    var params = [];
	if (t3900!=0){
		sql = ' select T3900,T3901,T3902,T3913,trim(T3903)as T3903,trim(T3914)as T3914,trim(T3905)as T3905,trim(T3907)as T3907,'+
			' T3908,T3909,T3912,T3915,T3916,T3917,T3918,T3918,trim(T3920)as T3920,trim(T3921)as T3921,trim(T3922)as T3922,'+
			' T3923,T3924,T3925,trim(T3926)as T3926,trim(T3927)as T3927,trim(T3928)as T3928,T3929,T3930,T3933,'+
			' T3934,T3935,T3936,T3937,T3931,T3932,T3938,T3939,T3940,trim(T3941)as T3941,T3942,T3943,T3944,T3945,T3946,T3947,T3948,T3949,'+
			' T3950,T3951,T3953,T3955,T3956,T3957,T3958,T3959,T3960,T3961,T3962 from T39 where T3900=:T3900 order by T3915,T3900';
		params = [t3900];
	}else{/*T3952,T3954,*/
		sql = ' select T3900,T3901,T3902,T3913,trim(T3903)as T3903,trim(T3914)as T3914,trim(T3905)as T3905,trim(T3907)as T3907,'+
			' T3908,T3909,T3912,T3915,T3916,T3917,T3918,T3918,trim(T3920)as T3920,trim(T3921)as T3921,trim(T3922)as T3922,'+
			' T3923,T3924,T3925,trim(T3926)as T3926,trim(T3927)as T3927,trim(T3928)as T3928,T3929,T3930,T3933,'+
			' T3934,T3935,T3936,T3937,T3931,T3932,T3938,T3939,T3940,trim(T3941)as T3941,T3942,T3943,T3944,T3945,T3946,T3947,T3948,T3949,'+
			' T3950,T3951,T3953,T3955,T3956,T3957,T3958,T3959,T3960,T3961,T3962 from T39 where T3902 in(select T4000 from T40 where T4000=:T4000) order by T3915,T3900';
		params = [t4000];
		/*or T4005 like :T4005
	params = [t4000,"%;"+t4000+";%"];*/
	}
    Oracle.queryParam(sql,params,function(err,data){
        if (err){
            var result = {
                "data": {"ErrSQL":sql},
                "message": "查询数据库错误T39："+ err,
                "status": 300
            }
            res.send(JSON.stringify(result));
        }else{
            var json = gFunc.oracleRowsToJson(data);
            var len = data.rows.length;
            var loopT39 = function(i){
                if (i<len){
                    var t3900 = json.Rows[i].T3900;
                    var sql = 'select TCJ0100,TCJ0101,TCJ0102,TCJ0103,TCJ0104,TCJ0105,TCJ0106,TCJ0107 from TCJ01 where TCJ0101=:TCJ0101 order by TCJ0103,TCJ0100';
                    var params = [t3900];
                    Oracle.queryParam(sql,params,function(err,data){
                        if (err){
                            var result = {
                                "data": {"ErrSQL":sql},
                                "message": "查询数据库错误TCJ01："+ err,
                                "status": 300
                            }
                            res.send(JSON.stringify(result));
                        }else{
                            var tcj01Json = gFunc.oracleRowsToJson(data);
                            var tcj01Len = data.rows.length;
                            var loopTCJ01 = function(j){
                                if (j<tcj01Len){
                                    var tcj0100 = tcj01Json.Rows[j].TCJ0100;
                                    var sql = ' select TCJ0200,TCJ0201,TCJ0202,TCJ0203,TCJ0204,TCJ0205,trim(TCJ0206)as TCJ0206,TCJ0208,TCJ0209,TCJ0210,TCJ0211,TCJ0212,TCJ0213,TCJ0214'+
                                              ' from TCJ02 where TCJ0201=:TCJ0201 order by TCJ0205,TCJ0200';
                                    var params = [tcj0100];
                                    Oracle.queryParam(sql,params,function(err,data){
                                        if (err){
                                            var result = {
                                                "data": {"ErrSQL":sql},
                                                "message": "查询数据库错误TCJ02："+ err,
                                                "status": 300
                                            }
                                            res.send(JSON.stringify(result));
                                        }else{
                                            var tcj02Json = gFunc.oracleRowsToJson(data);
                                            var tcj02Len = data.rows.length;
                                            var loopTCJ02 = function(k){
                                                if (k<tcj02Len){
                                                    var tcj0200 = tcj02Json.Rows[k].TCJ0200;
                                                    var sql = 'select TCJ0700,TCJ0701,TCJ0702,TCJ0703,TCJ0704 from TCJ07 where TCJ0701=:TCJ0701 order by TCJ0703,TCJ0700';
                                                    var params = [tcj0200];
                                                    Oracle.queryParam(sql,params,function(err,data){
                                                        if (err){
                                                            var result = {
                                                                "data": {"ErrSQL":sql},
                                                                "message": "查询数据库错误TCJ07："+ err,
                                                                "status": 300
                                                            }
                                                            res.send(JSON.stringify(result));
                                                        }else{
                                                            tcj02Json.Rows[k].TCJ07Table = gFunc.oracleRowsToJson(data);
                                                            loopTCJ02(k+1);
                                                        }
                                                    });
                                                }else{
                                                    tcj01Json.Rows[j].TCJ02Table = tcj02Json;
                                                    loopTCJ01(j+1);
                                                }
                                            };
                                            loopTCJ02(0);
                                        }
                                    });
                                }else{
                                    json.Rows[i].TCJ01Table = tcj01Json;
                                    loopT39(i+1);
                                }
                            };
                            loopTCJ01(0);
                        }
                    });
                }else{
                    var result = {
                        "data": json,
                        "message": "查询检修明细表模板成功!",
                        "status": 200
                    }
                    res.send(JSON.stringify(result));
                }
            };
            loopT39(0);
        }
    });
}

exports.getTFJ01=function(req,res) {
	var json =JSON.parse(req.body.params);
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
	var tfj0100 = 0;
	if (json.Data.TFJ0100!=null&&json.Data.TFJ0100!=0){
		tfj0100 = json.Data.TFJ0100;
	}
	var sql = '';
	var params = [];
	if (tfj0100!=0){
		sql = ' select TFJ0100,TFJ0101,trim(TFJ0102)as TFJ0102,TFJ0103,trim(TFJ0104)as TFJ0104,trim(TFJ0105)as TFJ0105 ,trim(TFJ0106)as TFJ0106,TFJ0107,trim(TFJ0108)as TFJ0108,' +
			  ' TFJ0109,TFJ0110,to_char(TFJ0111,\'YYYY-MM-DD HH24:mi:ss\')as TFJ0111,'+
		 	  ' TFJ0112,TFJ0113,TFJ0114,TFJ0115,TFJ0116,TFJ0117,TFJ0118,TFJ0119,to_char(TFJ0120,\'YYYY-MM-DD HH24:mi:ss\')as TFJ0120,'+
			  ' TFJ0121,TFJ0122,TFJ0123,TFJ0124,TFJ0125,TFJ0126,TFJ0127,TFJ0128,TFJ0129,TFJ0130,TFJ0131,TFJ0132,TFJ0133' +
			  ' from TFJ01 where TFJ0100=:TFJ0100';
		params = [tfj0100];
	}else{
		sql = ' select TFJ0100,TFJ0101,trim(TFJ0102)as TFJ0102,TFJ0103,trim(TFJ0104)as TFJ0104,trim(TFJ0105)as TFJ0105 ,trim(TFJ0106)as TFJ0106,TFJ0107,trim(TFJ0108)as TFJ0108,' +
			' TFJ0109,TFJ0110,to_char(TFJ0111,\'YYYY-MM-DD HH24:mi:ss\')as TFJ0111,'+
			' TFJ0112,TFJ0113,TFJ0114,TFJ0115,TFJ0116,TFJ0117,TFJ0118,TFJ0119,to_char(TFJ0120,\'YYYY-MM-DD HH24:mi:ss\')as TFJ0120,'+
			' TFJ0121,TFJ0122,TFJ0123,TFJ0124,TFJ0125,TFJ0126,TFJ0127,TFJ0128,TFJ0129,TFJ0130,TFJ0131,TFJ0132,TFJ0133' +
			' from TFJ01 where TFJ0103=:TFJ0103';
		params = [t0200];
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
				"message": "查询检修明细主表成功!",
				"status": 200
			}
			res.send(JSON.stringify(result));
		}
	});
}

exports.getTFJ02=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ0100==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var tfj0100 = json.Data.TFJ0100;
	var tfj0200 = 0;
	if (json.Data.TFJ0200!=null&&json.Data.TFJ0200!=0){
		tfj0200 = json.Data.TFJ0200;
	}
	var sql = '';
	var params = [];
	if (tfj0200!=0){ //
		sql = ' select TFJ0200,TFJ0204,TFJ0201,trim(TFJ0203)as TFJ0203,TFJ0205,trim(TFJ0206)as TFJ0206,TFJ0207,TFJ0210,TFJ0208,trim(TFJ0209)as TFJ0209,' +
			  ' TFJ0211,TFJ0212,TFJ0213,TFJ0214,TFJ0216,TFJ0217,TFJ0218,TFJ0219,trim(TFJ0220)as TFJ0220,trim(TFJ0221)as TFJ0221,trim(TFJ0222)as TFJ0222,' +
			  ' trim(TFJ0223)as TFJ0223,trim(TFJ0224)as TFJ0224,trim(TFJ0225)as TFJ0225,trim(TFJ0226)as TFJ0226,TFJ0227,trim(TFJ0228)as TFJ0228,' +
			  ' trim(TFJ0230)as TFJ0230,TFJ0231,TFJ0232,TFJ0233,TFJ0234,TFJ0235,TFJ0236,TFJ0237,TFJ0238,TFJ0239,TFJ0240,TFJ0241,TFJ0242,' +
			  ' TFJ0243,TFJ0244,TFJ0245,to_char(TFJ0246,\'YYYY-MM-DD hh24:mi:ss\')as TFJ0246,TFJ0247,TFJ0248,TFJ0249,TFJ0250,TFJ0251,TFJ0252,TFJ0253,' +
			  ' TFJ0254,TFJ0255,TFJ0202,TFJ0256,TFJ0257,TFJ0258,TFJ0259,TFJ0260,TFJ0262,TFJ0263,TFJ0264,TFJ0265,TFJ0266,TFJ0269,TFJ0270,' +
			  ' TFJ0272,TFJ0273,TFJ0274,TFJ0275,cast(trim(TFJ0276) as char(255))as TFJ0276,cast(trim(TFJ0277) as char(255))as TFJ0277,cast(trim(TFJ0278) as char(255))as TFJ0278,TFJ0229,TFJ0261,TFJ0271,cast(trim(TFJ0279) as char(255))as TFJ0279'+
			  ' from TFJ02 where TFJ0200=:TFJ0200';
		params = [tfj0200];
	}else{ //
		sql = ' select TFJ0200,TFJ0204,TFJ0201,trim(TFJ0203)as TFJ0203,TFJ0205,trim(TFJ0206)as TFJ0206,TFJ0207,TFJ0210,TFJ0208,trim(TFJ0209)as TFJ0209,' +
		 	 ' TFJ0211,TFJ0212,TFJ0213,TFJ0214,TFJ0216,TFJ0217,TFJ0218,TFJ0219,trim(TFJ0220)as TFJ0220,trim(TFJ0221)as TFJ0221,trim(TFJ0222)as TFJ0222,' +
			 ' trim(TFJ0223)as TFJ0223,trim(TFJ0224)as TFJ0224,trim(TFJ0225)as TFJ0225,trim(TFJ0226)as TFJ0226,TFJ0227,trim(TFJ0228)as TFJ0228,' +
			 ' trim(TFJ0230)as TFJ0230,TFJ0231,TFJ0232,TFJ0233,TFJ0234,TFJ0235,TFJ0236,TFJ0237,TFJ0238,TFJ0239,TFJ0240,TFJ0241,TFJ0242,' +
			 ' TFJ0243,TFJ0244,TFJ0245,to_char(TFJ0246,\'YYYY-MM-DD hh24:mi:ss\')as TFJ0246,TFJ0247,TFJ0248,TFJ0249,TFJ0250,TFJ0251,TFJ0252,TFJ0253,' +
			 ' TFJ0254,TFJ0255,TFJ0202,TFJ0256,TFJ0257,TFJ0258,TFJ0259,TFJ0260,TFJ0262,TFJ0263,TFJ0264,TFJ0265,TFJ0266,TFJ0269,TFJ0270,' +
     		 ' TFJ0272,TFJ0273,TFJ0274,TFJ0275,cast(trim(TFJ0276) as char(255))as TFJ0276,cast(trim(TFJ0277) as char(255))as TFJ0277,cast(trim(TFJ0278) as char(255))as TFJ0278,TFJ0229,TFJ0261,TFJ0271,cast(trim(TFJ0279) as char(255))as TFJ0279'+
			 ' from TFJ02 where TFJ0204=:TFJ0204 order by TFJ0211,TFJ0200';
		params = [tfj0100];
	}
	Oracle.queryParam(sql,params,function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误TFJ02："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
		}else{
			var json = gFunc.oracleRowsToJson(data);
			var len = data.rows.length;
			var loopTFJ02 = function(i){
				if (i<len){
					var tfj0200 = json.Rows[i].TFJ0200;
					var sql = 'select TCJ0500,TCJ0501,TCJ0502,TCJ0503,TCJ0504,TCJ0505,TCJ0506,TCJ0507 from TCJ05 where TCJ0501=:TCJ0501 order by TCJ0503,TCJ0500';
					var params = [tfj0200];
					Oracle.queryParam(sql,params,function(err,data){
						if (err){
							var result = {
								"data": {"ErrSQL":sql},
								"message": "查询数据库错误TCJ05："+ err,
								"status": 300
							}
							res.send(JSON.stringify(result));
						}else{
							var tcj05Json = gFunc.oracleRowsToJson(data);
							var tcj05Len = data.rows.length;
							var loopTCJ05 = function(j){
								if (j<tcj05Len){
									var tcj0500 = tcj05Json.Rows[j].TCJ0500;
									var sql = ' select TCJ0600,TCJ0601,TCJ0603,TCJ0604,TCJ0605,trim(TCJ0606)as TCJ0606,TCJ0608,TCJ0609,TCJ0610,TCJ0611,TCJ0612,TCJ0613,TCJ0614'+
										' from TCJ06 where TCJ0601=:TCJ0601 order by TCJ0605,TCJ0600';
									var params = [tcj0500];
									Oracle.queryParam(sql,params,function(err,data){
										if (err){
											var result = {
												"data": {"ErrSQL":sql},
												"message": "查询数据库错误TCJ06："+ err,
												"status": 300
											}
											res.send(JSON.stringify(result));
										}else{
											var tcj06Json = gFunc.oracleRowsToJson(data);
											var tcj06Len = data.rows.length;
											var loopTCJ06 = function(k){
												if (k<tcj06Len){
													var tcj0600 = tcj06Json.Rows[k].TCJ0600;
													var sql = 'select TCJ0800,TCJ0801,TCJ0802,TCJ0803,TCJ0804 from TCJ08 where TCJ0801=:TCJ0801 order by TCJ0803,TCJ0800';
													var params = [tcj0600];
													Oracle.queryParam(sql,params,function(err,data){
														if (err){
															var result = {
																"data": {"ErrSQL":sql},
																"message": "查询数据库错误TCJ08："+ err,
																"status": 300
															}
															res.send(JSON.stringify(result));
														}else{
															tcj06Json.Rows[k].TCJ08Table = gFunc.oracleRowsToJson(data);
															loopTCJ06(k+1);
														}
													});
												}else{
													tcj05Json.Rows[j].TCJ06Table = tcj06Json;
													loopTCJ05(j+1);
												}
											};
											loopTCJ06(0);
										}
									});
								}else{
									json.Rows[i].TCJ05Table = tcj05Json;
									var sql = 'select T7500,T7501,T7502,T7503 from T75 where T7503=:T7503 order by T7500';
									var params =[tfj0200];
									Oracle.queryParam(sql,params,function(err,data){
										if (err){
											var result = {
												"data": {"ErrSQL":sql},
												"message": "查询数据库错误TCJ08："+ err,
												"status": 300
											}
											res.send(JSON.stringify(result));
										}else{
											json.Rows[i].T75Table = gFunc.oracleRowsToJson(data);
											loopTFJ02(i+1);
										}
									});
								}
							};
							loopTCJ05(0);
						}
					});
				}else{
					var result = {
						"data": json,
						"message": "查询检修明细表模板成功!",
						"status": 200
					}
					res.send(JSON.stringify(result));
				}
			};
			loopTFJ02(0);
		}
	});
}

exports.insertTFJ01=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.T0200==null||json.Data.T3400==null||json.Data.TRS0100==null||json.Data.TFJ0109==null||json.Data.TFJ0113==null||json.Data.TFJ0114==null||json.Data.TFJ0115==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var t0200 = json.Data.T0200;
	var t3400 = json.Data.T3400;
	var trs0100 = json.Data.TRS0100;
	var tfj0109 = json.Data.TFJ0109;
	var tfj0113 = json.Data.TFJ0113;
	var tfj0114 = json.Data.TFJ0114;
	var tfj0115 = json.Data.TFJ0115;
	var sql = 'select Nvl((select T0200 from T02 where T0200=:T0200),0) as T0200,'+
		' Nvl((select T3400 from T34 where T3400=:T3400),0)as T3400,'+
		' Nvl((select TRS0100 from TRS01 where TRS0100=:TRS0100),0)as TRS0100,'+
		' Nvl((select T3405 from T34 where T3400=:T3400),0)as T3405,'+
		' (select count(1) from TFJ01 where TFJ0103=:TFJ0103 and TFJ0101=:TFJ0101)as sl,'+
		' (case when (select count(1) from TFJ71 where TFJ7101=:T0200) = 0 then 0 else 1 end)as IsGXCC,'+
		' TFJ0100.NextVal as TFJ0100'+
		' from dual';
	Oracle.queryParam(sql,[t0200,t3400,trs0100,t3400,t0200,t3400,t0200],function(err,data){
		if (err){
			var result = {
				"data": {"ErrSQL":sql},
				"message": "查询数据库错误："+ err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		var IsGxcc = data.rows[0][5];
		if (data.rows[0][0]==0){
			var result = {
				"data": {},
				"message": "无效的车辆ID:"+t0200+"",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.rows[0][1]==0){
			var result = {
				"data": {},
				"message": "无效的部位ID:"+t3400+"",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.rows[0][2]==0){
			var result = {
				"data": {},
				"message": "无效的人员ID:"+trs0100+"",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.rows[0][3]==0){
			var result = {
				"data": {},
				"message": "该部位不需要接车!",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.rows[0][4]>0&&IsGxcc==0){
			var result = {
				"data": {},
				"message": "该车辆部位的接车单已存在，不能重复添加!",
				"status": 201
			}
			res.send(JSON.stringify(result));
			return;
		}
		var tfj0100 = data.rows[0][6];
		var sql =
		' declare'+
			' TTRS0100 TRS01.TRS0100%TYPE;'+
			' cplxID T07.T0700%TYPE;'+
			' is_jc NUMBER(10);'+
			' is_tj NUMBER(10);'+
			' xc_id NUMBER(10);'+
			' Is_Gxcc NUMBER(10);'+
			' TT0202 T02.T0202%TYPE;'+
			' TTFJ0100 TFJ01.TFJ0100%TYPE;'+
			' TTFJ0101 TFJ01.TFJ0101%TYPE;'+
			' TTFJ0102 TFJ01.TFJ0102%TYPE;'+
			' TTFJ0103 TFJ01.TFJ0103%TYPE;'+
			' TTFJ0104 TFJ01.TFJ0104%TYPE;'+
			' TTFJ0105 TFJ01.TFJ0105%TYPE;'+
			' TTFJ0106 TFJ01.TFJ0106%TYPE;'+
			' TTFJ0107 TFJ01.TFJ0107%TYPE;'+
			' TTFJ0108 TFJ01.TFJ0108%TYPE;'+
			' TTFJ0109 TFJ01.TFJ0109%TYPE;'+
			' TTFJ0113 TFJ01.TFJ0113%TYPE;'+
			' TTFJ0114 TFJ01.TFJ0114%TYPE;'+
			' TTFJ0115 TFJ01.TFJ0115%TYPE;'+
			' TTFJ0116 TFJ01.TFJ0116%TYPE;'+
			' TTFJ0118 TFJ01.TFJ0118%TYPE;'+
			' TTFJ0119 TFJ01.TFJ0119%TYPE;'+
			' TTFJ0120 TFJ01.TFJ0120%TYPE;'+
			' TTFJ0121 TFJ01.TFJ0121%TYPE;'+
			' TTFJ0122 TFJ01.TFJ0122%TYPE;'+
			' TTFJ0123 TFJ01.TFJ0123%TYPE;'+
			' TTFJ0124 TFJ01.TFJ0124%TYPE;'+
			' TTFJ0125 TFJ01.TFJ0125%TYPE;'+
			' TTFJ0126 TFJ01.TFJ0126%TYPE;'+
			' TTFJ0127 TFJ01.TFJ0127%TYPE;'+
			' TTFJ0128 TFJ01.TFJ0128%TYPE;'+
			' TTFJ0129 TFJ01.TFJ0129%TYPE;'+
			' TTFJ0130 TFJ01.TFJ0130%TYPE;'+
			' TTFJ0131 TFJ01.TFJ0131%TYPE;'+
			' TTFJ0132 TFJ01.TFJ0132%TYPE;'+
		' begin'+
			//赋值
			' select :T0200,:T3400,:TRS0100,:TFJ0100,:TFJ0109,:TFJ0113,:TFJ0114,:TFJ0115,:Is_Gxcc into TTFJ0103,TTFJ0101,TTRS0100,TTFJ0100,TTFJ0109,TTFJ0113,TTFJ0114,TTFJ0115,Is_Gxcc from dual;'+
			//取车辆信息
			' select trim(T0203),trim(T0204),T0221,T0202 into TTFJ0104,TTFJ0105,xc_id,TT0202 from T02 where T0200=TTFJ0103;'+
			//取产品类型
			' select (case when T0707=0 then T0700 else cast(substr(T0706,2,instr(T0706,\';\',1,2)-2) as number) end) into cplxID from T07 where T0700=TT0202;'+
			//如果是机车，取相关信息
			' select count(1) into is_jc from T07 where T0700=cplxID and T0701 like \'%机车%\';'+
			' TTFJ0127:=\'\';TTFJ0128:=\'\';TTFJ0129:=\'\';TTFJ0130:=\'\';TTFJ0122:=\'\';'+
			' if is_jc=1 then'+
			'  select nvl(max((select trim(trs0104) from TRS01 where TRS0100=s0906)),\'\') into TTFJ0127 from S09 where s0903 = 1 and s0901=39 and s0902=cplxID;'+
			'  select nvl(max((select trim(trs0104) from TRS01 where TRS0100=s0906)),\'\') into TTFJ0128 from S09 where s0903 = 2 and s0901=39 and s0902=cplxID;'+
			'  select nvl(max((select trim(trs0104) from TRS01 where TRS0100=s0906)),\'\') into TTFJ0129 from S09 where s0903 = 3 and s0901=39 and s0902=cplxID;'+
			'  select nvl(max((select trim(trs0104) from TRS01 where TRS0100=s0906)),\'\') into TTFJ0130 from S09 where s0903 = 4 and s0901=39 and s0902=cplxID;'+
			'  select nvl(max((select trim(trs0104) from TRS01 where TRS0100=s0906)),\'\') into TTFJ0122 from S09 where s0903 = 5 and s0901=39 and s0902=cplxID;'+
			' end if;'+
			' TTFJ0106:=\'-4\';TTFJ0107:=0;TTFJ0116:=0;TTFJ0119:=0;'+
			//如果不需要接车，直接提交到检修明细表，并计算费用指标
			' select trim(T3401),Nvl(T3405,0) into TTFJ0102,is_tj from T34 where T3400=TTFJ0101;'+
			' if is_tj=0 then'+
			'  TTFJ0106:=\'-1\';TTFJ0119:=TTRS0100;'+
			'  select Nvl(sum(TFJ2804),0),Nvl(sum(TFJ2805),0) into TTFJ0116,TTFJ0107 from TFJ28 where TFJ2801 in(select TFJ2700 from TFJ27 where'+
			'  TFJ2705 in(select TFJ5202 from TFJ52 where TFJ5204 = 3 and TFJ5201 = TTFJ0103) and TFJ2710 =xc_id and TFJ2703=cplxID and TFJ2707 =TTFJ0101);'+
			' end if;'+
			//计算单据编号
			' select (case when max(TFJ0108) is null or max(TFJ0108)=\'\' then cast(to_char(sysdate,\'YYYYMMDD\')||\'001\' as number) else max(TFJ0108) + 1 end)' +
			' into TTFJ0108 from TFJ01 where to_char(sysdate,\'YYYYMMDD\')=substr(TFJ0108,1,8);'+
			' TTFJ0118:=TTRS0100;'+
			//单据日期、送车代表、接车备注................
			' TTFJ0120:=sysdate;TTFJ0121:=\'\';TTFJ0123:=\'\';TTFJ0124:=\'\';TTFJ0125:=\'\';TTFJ0126:=\'\';TTFJ0131:=\'\';TTFJ0132:=0;'+
			' select max(TFJ0121) into TTFJ0121 from TFJ01 where (not TFJ0121 is null or Length(TFJ0121) > 0) and TFJ0103=TTFJ0103;'+
			' if TTFJ0122=\'\' then'+
			'  select max(TFJ0122) into TTFJ0122 from TFJ01 where (not TFJ0122 is null or Length(TFJ0122) > 0) and TFJ0103=TTFJ0103;'+
			' end if;'+
			' select max(TFJ0123) into TTFJ0123 from TFJ01 where (not TFJ0123 is null or Length(TFJ0123) > 0) and TFJ0103=TTFJ0103;'+
			' select max(TFJ0124) into TTFJ0124 from TFJ01 where (not TFJ0124 is null or Length(TFJ0124) > 0) and TFJ0103=TTFJ0103;'+
			' select max(TFJ0125) into TTFJ0125 from TFJ01 where (not TFJ0125 is null or Length(TFJ0125) > 0) and TFJ0103=TTFJ0103;'+
			' select max(TFJ0126) into TTFJ0126 from TFJ01 where (not TFJ0126 is null or Length(TFJ0126) > 0) and TFJ0103=TTFJ0103;'+
			' if TTFJ0127=\'\' then'+
			'  select max(TFJ0127) into TTFJ0127 from TFJ01 where (not TFJ0127 is null or Length(TFJ0127) > 0) and TFJ0103=TTFJ0103;'+
			' end if;'+
			' if TTFJ0128=\'\' then'+
			'  select max(TFJ0128) into TTFJ0128 from TFJ01 where (not TFJ0128 is null or Length(TFJ0128) > 0) and TFJ0103=TTFJ0103;'+
			' end if;'+
			' if TTFJ0129=\'\' then'+
			'  select max(TFJ0129) into TTFJ0129 from TFJ01 where (not TFJ0129 is null or Length(TFJ0129) > 0) and TFJ0103=TTFJ0103;'+
			' end if;'+
			' if TTFJ0130=\'\' then'+
			'  select max(TFJ0130) into TTFJ0130 from TFJ01 where (not TFJ0130 is null or Length(TFJ0130) > 0) and TFJ0103=TTFJ0103;'+
			' end if;'+
			' select max(TFJ0131) into TTFJ0131 from TFJ01 where (not TFJ0131 is null or Length(TFJ0131) > 0) and TFJ0103=TTFJ0103;'+
			' select nvl(max(TFJ0132),0) into TTFJ0132 from TFJ01 where (not TFJ0132 is null or TFJ0132 <> 0) and TFJ0103=TTFJ0103;'+
			//添加检修明细表主表
			' insert into TFJ01(TFJ0100, TFJ0101, TFJ0102, TFJ0103, TFJ0104, TFJ0105, TFJ0106,'+
			' TFJ0107, TFJ0108, TFJ0109, TFJ0113, TFJ0114, TFJ0115, TFJ0116, TFJ0118, TFJ0119,'+
			' TFJ0120, TFJ0121, TFJ0122, TFJ0123, TFJ0124, TFJ0125, TFJ0126, TFJ0127, TFJ0128,'+
			' TFJ0129, TFJ0130, TFJ0131, TFJ0132, TFJ0110)'+
			' values(TTFJ0100, TTFJ0101, TTFJ0102, TTFJ0103, TTFJ0104, TTFJ0105, TTFJ0106,'+
			' TTFJ0107, TTFJ0108, TTFJ0109, TTFJ0113, TTFJ0114, TTFJ0115, TTFJ0116, TTFJ0118, TTFJ0119,'+
			' TTFJ0120, TTFJ0121, TTFJ0122, TTFJ0123, TTFJ0124, TTFJ0125, TTFJ0126, TTFJ0127, TTFJ0128,'+
			' TTFJ0129, TTFJ0130, TTFJ0131, TTFJ0132, 0);'+
			//如果是改修程车，转移原车部位下的检修明细表到新车检修部位下，并且删除原车部位记录
			' if Is_Gxcc=1 then'+
			'  update TFJ02 set TFJ0204 =TTFJ0100 where TFJ0204 in(select TFJ0100 from TFJ01 where TFJ0103=TTFJ0103 and TFJ0101=TTFJ0101);'+
			'  delete TFJ01 where TFJ0103 = TTFJ0103 and TFJ0101 =TTFJ0101;'+
			' end if;'+
		' end;';
		Oracle.queryParam(sql,[t0200,t3400,trs0100,tfj0100,tfj0109,tfj0113,tfj0114,tfj0115,IsGxcc],function(err){
			if (err){
				console.log(sql);
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			var result = {
				"data": {"ErpID":tfj0100,"IsGXCC":IsGxcc},
				"message": "添加成功！",
				"status": 200
			}
			res.send(JSON.stringify(result));
		});
	});
}

exports.deleteTFJ01=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ0100==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var tfj0100 = json.Data.TFJ0100;
	var sql = 'select TFJ0100 from TFJ01 where TFJ0100=:TFJ0100';
	Oracle.queryParam(sql,[tfj0100],function(err,data){
		if (err) {
			var result = {
				"data": {"ErrSQL": sql},
				"message": "查询数据库错误：" + err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.rows.length<1){
			var result = {
				"data": {"ErrSQL": sql},
				"message": "没有记录！",
				"status": 200
			}
			res.send(JSON.stringify(result));
			return;
		}
		var sql = 'delete TFJ01 where TFJ0100=:TFJ0100';
		Oracle.queryParam(sql,[tfj0100],function(err){
			if (err) {
				var result = {
					"data": {"ErrSQL": sql},
					"message": "查询数据库错误：" + err,
					"status": 300
				}
				res.send(JSON.stringify(result));
			}else{
				var result = {
					"data": {},
					"message": "删除成功!",
					"status": 200
				}
				res.send(JSON.stringify(result));
			}
		});
	});
}

exports.insertTFJ02=function(req,res){
	// 	TFJ0201              NUMBER(10)                      not null, 明细项目(物资)ID(T3300)
	// 	TFJ0203              CHAR(256)                       not null, 说明
	// 	TFJ0204              NUMBER(10)                      not null, 分解检修主表ID(TFJ0100)
	// 	TFJ0205              NUMBER(10)                      not null, 模板明细ID(T3900)
	// 	TFJ0206              CHAR(50),								   配件(物资)名称
	// 	TFJ0208              NUMBER(5)                       not null, 顺序号
	// 	TFJ0209              CHAR(20),                                 工作号
	// 	TFJ0211              NUMBER(5),                                检修表位
	// 	TFJ0212              NUMBER(10)                      not null, 工厂生产工序ID(TSZ2300)
	// 	TFJ0213              NUMBER(5,2),                              工厂工时定额
	// 	TFJ0214              NUMBER(10)                      not null, 领料单位(车间)ID(TSZ2900)
	// 	TFJ0216              NUMBER(15,4),                             更换数量
	// 	TFJ0217              NUMBER(15,4),                             检修数量
	// 	TFJ0218              NUMBER(15,4),                             新制数量
	// 	TFJ0220              CHAR(20)                        not null, 页号
	// 	TFJ0227              NUMBER(15,4),                             应有数量
	// 	TFJ0228              CHAR(40),                                 分解材料物资规格
	// 	TFJ0232              NUMBER(2)                       not null, 新增项目(0是 1否)
	// 	TFJ0233              VARCHAR2(20),                             工厂工艺路线简称
	// 	TFJ0234              FLOAT                          default 0, 配件面积
	// 	TFJ0235              FLOAT                          default 0, 考漆或喷塑(1烤漆 2喷塑 3油漆)
	// 	TFJ0236              NUMBER(1)                      default 0, 选装标志(0否 1是)
	// 	TFJ0237              FLOAT                          default 0, 重量
	// 	TFJ0238              FLOAT                          default 0, 比重
	// 	TFJ0239              NUMBER(1)                      default 0, 净材标志(0否 1硬木 2软木 3华南硬木)
	// 	TFJ0240              VARCHAR2(10),                             检修计量单位
	// 	TFJ0241              FLOAT                          default 0, 配件体积
	// 	TFJ0243              FLOAT,                                    配件长度
	// 	TFJ0244              NUMBER(10),                               供货厂商ID
	// 	TFJ0249              FLOAT,                                    喷塑烤漆面积
	// 	TFJ0250              NUMBER(1),                                物料属性(TJS0546)
	// 	TFJ0251              NUMBER(15,4),                             拆损数
	// 	TFJ0253              VARCHAR2(6),                              送件标志
	// 	TFJ0254              NUMBER(10),                               实际领料单位ID
	// 	TFJ0255              VARCHAR2(20),                             招标分类(TFJ4702)
	// 	TFJ0260              NUMBER(1)                      default 0, 接车标志(0 否 1 是)
	// 	TFJ0263              NUMBER(15,4)                   default 0, 缺少数量
	// 	TFJ0264              NUMBER(1)                      default 0, 要求加装(0 无 1 否 2 是)
	// 	TFJ0265              NUMBER(1),                                是否收费(0 无 1 否 2 是)
	// 	TFJ0266              NUMBER(1)                      default 0, 检修分类(0 正常检修 1 合同要求 2 段改保修)
	// 	TFJ0269              NUMBER(1)                      default 0, 检修项目选中
	// 	TFJ0270              NUMBER(1)                      default 0, 数据状态
	// 	TFJ0276              VARCHAR2(255),                            入厂状态(机车)
	// 	TFJ0277              VARCHAR2(255),                            会议决议(机车)
	// 	TFJ0278              VARCHAR2(254),                            车间补充备注
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ0201==null||json.Data.TFJ0203==null||json.Data.TFJ0204==null||json.Data.TFJ0205==null||json.Data.TFJ0206==null||json.Data.TFJ0208==null||
		json.Data.TFJ0209==null||json.Data.TFJ0211==null||json.Data.TFJ0212==null||json.Data.TFJ0213==null||json.Data.TFJ0214==null||json.Data.TFJ0216==null||
		json.Data.TFJ0217==null||json.Data.TFJ0218==null||json.Data.TFJ0220==null||json.Data.TFJ0227==null||json.Data.TFJ0228==null||json.Data.TFJ0232==null||
		json.Data.TFJ0233==null||json.Data.TFJ0234==null||json.Data.TFJ0235==null||json.Data.TFJ0236==null||json.Data.TFJ0237==null||json.Data.TFJ0238==null||
		json.Data.TFJ0239==null||json.Data.TFJ0240==null||json.Data.TFJ0241==null||json.Data.TFJ0243==null||json.Data.TFJ0244==null||json.Data.TFJ0249==null||
		json.Data.TFJ0250==null||json.Data.TFJ0251==null||json.Data.TFJ0253==null||json.Data.TFJ0254==null||json.Data.TFJ0255==null||json.Data.TFJ0260==null||
		json.Data.TFJ0263==null||json.Data.TFJ0264==null||json.Data.TFJ0265==null||json.Data.TFJ0266==null||json.Data.TFJ0269==null||json.Data.TFJ0270==null||
		json.Data.TFJ0276==null||json.Data.TFJ0277==null||json.Data.TFJ0278==null
	){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var tfj0201 = json.Data.TFJ0201, tfj0203 = json.Data.TFJ0203, tfj0204 = json.Data.TFJ0204, tfj0205 = json.Data.TFJ0205,tfj0206 = json.Data.TFJ0206, tfj0208 = json.Data.TFJ0208;
	var tfj0209 = json.Data.TFJ0209, tfj0211 = json.Data.TFJ0211, tfj0212 = json.Data.TFJ0212, tfj0213 = json.Data.TFJ0213,tfj0214 = json.Data.TFJ0214, tfj0216 = json.Data.TFJ0216;
	var tfj0217 = json.Data.TFJ0217, tfj0218 = json.Data.TFJ0218, tfj0220 = json.Data.TFJ0220, tfj0227 = json.Data.TFJ0227,tfj0228 = json.Data.TFJ0228, tfj0232 = json.Data.TFJ0232;
	var tfj0233 = json.Data.TFJ0233, tfj0234 = json.Data.TFJ0234, tfj0235 = json.Data.TFJ0235, tfj0236 = json.Data.TFJ0236,tfj0237 = json.Data.TFJ0237, tfj0238 = json.Data.TFJ0238;
	var tfj0239 = json.Data.TFJ0239, tfj0240 = json.Data.TFJ0240, tfj0241 = json.Data.TFJ0241, tfj0243 = json.Data.TFJ0243,tfj0244 = json.Data.TFJ0244, tfj0249 = json.Data.TFJ0249;
	var tfj0250 = json.Data.TFJ0250, tfj0251 = json.Data.TFJ0251, tfj0253 = json.Data.TFJ0253, tfj0254 = json.Data.TFJ0254,tfj0255 = json.Data.TFJ0255, tfj0260 = json.Data.TFJ0260;
	var tfj0263 = json.Data.TFJ0263, tfj0264 = json.Data.TFJ0264, tfj0265 = json.Data.TFJ0265, tfj0266 = json.Data.TFJ0266,tfj0269 = json.Data.TFJ0269, tfj0270 = json.Data.TFJ0270;
	var tfj0276 = json.Data.TFJ0276, tfj0277 = json.Data.TFJ0277, tfj0278 = json.Data.TFJ0278;
	//取主键
	var sql = 'select TFJ0200.NextVal as TFJ0200,(select nvl(max(TFJ0211),0) + 1 from TFJ02 where TFJ0204=:TFJ0204 and TFJ0220=:TFJ0220)as TFJ0211 from dual';
	var params = [tfj0204,tfj0220];
	Oracle.queryParam(sql,params,function(err,data) {
		if (err) {
			var result = {
				"data": {"ErrSQL": sql},
				"message": "查询数据库错误：" + err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		var tfj0200 = data.rows[0][0];
		var params = [];
		var sql = '';
		if (tfj0211 <= 0) {
			tfj0211 = data.rows[0][1];
		}
		if (tfj0205 < 1){
			//没有模板的情况时，添加TFJ02
			sql =
				' insert into TFJ02 (TFJ0200,' +
				' TFJ0201,TFJ0203,TFJ0204,TFJ0205,TFJ0206,TFJ0208,'+
				' TFJ0209,TFJ0211,TFJ0212,TFJ0213,TFJ0214,TFJ0216,'+
				' TFJ0217,TFJ0218,TFJ0220,TFJ0227,TFJ0228,TFJ0232,'+
				' TFJ0233,TFJ0234,TFJ0235,TFJ0236,TFJ0237,TFJ0238,'+
				' TFJ0239,TFJ0240,TFJ0241,TFJ0243,TFJ0244,TFJ0249,'+
				' TFJ0250,TFJ0251,TFJ0253,TFJ0254,TFJ0255,TFJ0260,'+
				' TFJ0263,TFJ0264,TFJ0265,TFJ0266,TFJ0269,TFJ0270,'+
				' TFJ0276,TFJ0277,TFJ0278,'+
				//下面是物资信息
				' TFJ0221,TFJ0222,TFJ0223,TFJ0224,TFJ0225,TFJ0226,' +
				' TFJ0207,TFJ0219,TFJ0210,TFJ0229,TFJ0230,TFJ0231,' +
				' TFJ0242,TFJ0245,TFJ0247,TFJ0261,TFJ0252,TFJ0271,' +
				' TFJ0272)' +
				//以物资信息为基础添加TFJ02表
				' select :TFJ0200,' +
				' :TFJ0201,:TFJ0203,:TFJ0204,:TFJ0205,:TFJ0206,:TFJ0208,'+
				' :TFJ0209,:TFJ0211,:TFJ0212,:TFJ0213,:TFJ0214,:TFJ0216,'+
				' :TFJ0217,:TFJ0218,:TFJ0220,:TFJ0227,:TFJ0228,:TFJ0232,'+
				' :TFJ0233,:TFJ0234,:TFJ0235,:TFJ0236,:TFJ0237,:TFJ0238,'+
				' :TFJ0239,:TFJ0240,:TFJ0241,:TFJ0243,:TFJ0244,:TFJ0249,'+
				' :TFJ0250,:TFJ0251,:TFJ0253,:TFJ0254,:TFJ0255,:TFJ0260,'+
				' :TFJ0263,:TFJ0264,:TFJ0265,:TFJ0266,:TFJ0269,:TFJ0270,'+
				' :TFJ0276,:TFJ0277,:TFJ0278,'+
				//下面是物资信息
				' max(trim(T3301)),max(trim(T3338)),max(trim(T3306)),max(trim(T3307)),max(trim(T3308)),max(trim(T3303)),'+
				' 0,0,0,null,null,null,'+
				' nvl(max(T3366),1),0,0,null,nvl(max(T3304),0),null,' +
				' null from T33 where T3300=:T3300';
			params = [tfj0200,
				tfj0201,tfj0203,tfj0204,tfj0205,tfj0206,tfj0208,
				tfj0209,tfj0211,tfj0212,tfj0213,tfj0214,tfj0216,
				tfj0217,tfj0218,tfj0220,tfj0227,tfj0228,tfj0232,
				tfj0233,tfj0234,tfj0235,tfj0236,tfj0237,tfj0238,
				tfj0239,tfj0240,tfj0241,tfj0243,tfj0244,tfj0249,
				tfj0250,tfj0251,tfj0253,tfj0254,tfj0255,tfj0260,
				tfj0263,tfj0264,tfj0265,tfj0266,tfj0269,tfj0270,
				tfj0276,tfj0277,tfj0278,tfj0201];
		}else {
			sql =
				' declare'+
				'  v_tfj0200 TFJ02.TFJ0200%TYPE;'+
				'  v_tfj0201 TFJ02.TFJ0201%TYPE;'+
				'  v_tfj0205 TFJ02.TFJ0205%TYPE;'+
				//  --定义工厂工艺路线变量
				'  TTCJ0100 TCJ01.TCJ0100%TYPE;'+
				'  TTCJ0102 TCJ01.TCJ0102%TYPE;'+
				'  TTCJ0103 TCJ01.TCJ0103%TYPE;'+
				'  TTCJ0104 TCJ01.TCJ0104%TYPE;'+
				'  TTCJ0106 TCJ01.TCJ0106%TYPE;'+
				'  TTCJ0107 TCJ01.TCJ0107%TYPE;'+
				//  --定义工厂工艺路线ID
				'  TTCJ0500 NUMBER(10);' +
				//'  --定义工厂工艺路线的车间工艺路线ID' +
				'  TTCJ0600 NUMBER(10);' +
				//  --定义工厂工艺路线的车间工艺路线变量' +
				'  TTCJ0200 TCJ02.TCJ0200%TYPE;'+
				'  TTCJ0202 TCJ02.TCJ0202%TYPE;'+
				'  TTCJ0203 TCJ02.TCJ0203%TYPE;'+
				'  TTCJ0204 TCJ02.TCJ0204%TYPE;'+
				'  TTCJ0205 TCJ02.TCJ0205%TYPE;'+
				'  TTCJ0206 TCJ02.TCJ0206%TYPE;'+
				'  TTCJ0208 TCJ02.TCJ0208%TYPE;'+
				'  TTCJ0208_S TCJ02.TCJ0208%TYPE;'+
				'  TTCJ0209 TCJ02.TCJ0209%TYPE;'+
				'  TTCJ0210 TCJ02.TCJ0210%TYPE;'+
				'  TTCJ0211 TCJ02.TCJ0211%TYPE;'+
				'  TTCJ0212 TCJ02.TCJ0212%TYPE;'+
				'  TTCJ0213 TCJ02.TCJ0213%TYPE;'+
				'  TTCJ0214 TCJ02.TCJ0214%TYPE;'+
				//  --定义车间工艺路线的工序工艺路线变量
				'  TTCJ0702 TCJ07.TCJ0702%TYPE;'+
				'  TTCJ0703 TCJ07.TCJ0703%TYPE;'+
				'  TTCJ0704 TCJ07.TCJ0704%TYPE;'+
				//  --定义工厂工艺路线游标
				'  CURSOR select_TCJ01 is select TCJ0100,TCJ0102,TCJ0103,TCJ0104,TCJ0106,Nvl(TCJ0107,0) FROM TCJ01 where TCJ0101=v_tfj0205;' +
				//  --定义工厂工艺路线的车间工艺路线游标
				'  CURSOR select_TCJ02 is select TCJ0200,TCJ0202,TCJ0203,TCJ0204,TCJ0205,TCJ0206,TCJ0208,TCJ0209,TCJ0210,TCJ0211,TCJ0212,TCJ0213,TCJ0214  FROM TCJ02 WHERE TCJ0201= TTCJ0100;' +
				//  --定义车间工艺路线的工序工艺路线游标
				'  CURSOR select_TCJ07 is select TCJ0702,TCJ0703,TCJ0704 FROM TCJ07 WHERE TCJ0701=TTCJ0200;'+
				' begin'+
				'  select :TFJ0200,:TFJ0201,:TFJ0205 into v_tfj0200,v_tfj0201,v_tfj0205 from dual;'+
				'  insert into TFJ02 (TFJ0200,' +
				'  TFJ0201,TFJ0203,TFJ0204,TFJ0205,TFJ0206,TFJ0208,'+
				'  TFJ0209,TFJ0211,TFJ0212,TFJ0213,TFJ0214,TFJ0216,'+
				'  TFJ0217,TFJ0218,TFJ0220,TFJ0227,TFJ0228,TFJ0232,'+
				'  TFJ0233,TFJ0234,TFJ0235,TFJ0236,TFJ0237,TFJ0238,'+
				'  TFJ0239,TFJ0240,TFJ0241,TFJ0243,TFJ0244,TFJ0249,'+
				'  TFJ0250,TFJ0251,TFJ0253,TFJ0254,TFJ0255,TFJ0260,'+
				'  TFJ0263,TFJ0264,TFJ0265,TFJ0266,TFJ0269,TFJ0270,'+
				'  TFJ0276,TFJ0277,TFJ0278,'+
				//下面是物资信息及检修模板信息
				'  TFJ0221,TFJ0222,TFJ0223,TFJ0224,TFJ0225,TFJ0226,' +
				'  TFJ0207,TFJ0219,TFJ0210,TFJ0229,TFJ0230,TFJ0231,' +
				'  TFJ0242,TFJ0245,TFJ0247,TFJ0261,TFJ0252,TFJ0271,' +
				'  TFJ0272)' +
				//以物资信息为基础添加TFJ02表
				'  select v_tfj0200,' +
				'  v_tfj0201,:TFJ0203,:TFJ0204,v_tfj0205,:TFJ0206,:TFJ0208,'+
				'  :TFJ0209,:TFJ0211,:TFJ0212,:TFJ0213,:TFJ0214,:TFJ0216,'+
				'  :TFJ0217,:TFJ0218,:TFJ0220,:TFJ0227,:TFJ0228,:TFJ0232,'+
				'  :TFJ0233,:TFJ0234,:TFJ0235,:TFJ0236,:TFJ0237,:TFJ0238,'+
				'  :TFJ0239,:TFJ0240,:TFJ0241,:TFJ0243,:TFJ0244,:TFJ0249,'+
				'  :TFJ0250,:TFJ0251,:TFJ0253,:TFJ0254,:TFJ0255,:TFJ0260,'+
				'  :TFJ0263,:TFJ0264,:TFJ0265,:TFJ0266,:TFJ0269,:TFJ0270,'+
				'  :TFJ0276,:TFJ0277,:TFJ0278,'+
				//下面是物资及检修模板信息
				'  trim(T3301),trim(T3338),trim(T3306),trim(T3307),trim(T3308),trim(T3303),'+
				'  Nvl(T3912,0),0,Nvl(T3929,0),T3954,(case when T3929=1 then (select trim(TFJ0601) from TFJ06 where TFJ0600=T3912) when T3929=2 then (select trim(TFJ0301) from TFJ03 where TFJ0300=T3912) else \'\' end),(case when T3929=1 then (select trim(TFJ0603) from TFJ06 where TFJ0600=T3912) when T3929=2 then (select trim(TFJ0306) from TFJ03 where TFJ0300=T3912) else \'\' end),'+
				'  nvl(T3366,1),0,0,T3951,nvl(T3304,0),T3952,' +
				'  T3953 from T39'+
				'  left join T33 on T3300=v_tfj0201'+
				'  where T3900=v_tfj0205;'+
				//'  --打开工厂工艺路线游标
				'   TTCJ0208_S := 0;' +
				'   OPEN select_TCJ01;' +
				'   LOOP' +
				//'      --提取这条检修明细记录的工厂工艺路线
				'      FETCH select_TCJ01 into TTCJ0100,TTCJ0102,TTCJ0103,TTCJ0104,TTCJ0106,TTCJ0107;' +
				'      EXIT WHEN select_TCJ01%notfound;' +
				//'      --求工厂工艺路线最大ID
				'      select TCJ0500.nextval into TTCJ0500 from dual;' +
				//'      -- 复制这条检修明细记录工厂工艺路线
				'      insert into TCJ05(TCJ0500,TCJ0501,TCJ0502,TCJ0503,TCJ0504,TCJ0505,TCJ0506,TCJ0507) values(TTCJ0500,v_tfj0200,TTCJ0102,TTCJ0103,TTCJ0104,0,TTCJ0106,TTCJ0107);' +
				//'      --打开工厂工艺路线的车间工艺路线游标\
				'      OPEN select_TCJ02;' +
				'      LOOP' +
				//'         -- 提取这条工厂工艺路线的车间工艺路线
				'         FETCH select_TCJ02 into TTCJ0200,TTCJ0202,TTCJ0203,TTCJ0204,TTCJ0205,TTCJ0206,TTCJ0208,TTCJ0209,TTCJ0210,TTCJ0211,TTCJ0212,TTCJ0213,TTCJ0214;' +
				'         EXIT WHEN select_TCJ02%notfound;' +
				//'         --求工厂工艺路线的车间工艺路线最大ID' +
				'         select TCJ0600.nextval into TTCJ0600 from dual;' +
				'         if TTCJ0208_S + TTCJ0208 > 100 then' +
				'            TTCJ0208 := 0;' +
				'         else' +
				'            TTCJ0208_S := TTCJ0208_S + TTCJ0208;' +
				'         end if;' +
				//'         -- 复制这条工厂工艺路线的车间工艺路线
				'         insert into TCJ06(TCJ0600,TCJ0601,TCJ0602,TCJ0603,TCJ0604,TCJ0605,TCJ0606,TCJ0607,TCJ0608,TCJ0609,TCJ0610,TCJ0611,TCJ0613,TCJ0614)' +
				'          values(TTCJ0600,TTCJ0500,TTCJ0202,TTCJ0203,TTCJ0204,TTCJ0205,TTCJ0206,TTCJ0208,TTCJ0209,TTCJ0210,TTCJ0211,TTCJ0212,TTCJ0213,TTCJ0214);' +
				//'         --打开车间工艺路线的工序工艺路线游标
				'         OPEN select_TCJ07;' +
				'         LOOP' +
				//'            --提取这条车间工艺路线的工序工艺路线
				'            FETCH select_TCJ07 into TTCJ0702,TTCJ0703,TTCJ0704;' +
				'            EXIT WHEN select_TCJ07%notfound;' +
				//'            --复制这条车间工艺路线的工序工艺路线
				'            insert into TCJ08 values(TCJ0800.nextval,TTCJ0600,TTCJ0702,TTCJ0703,TTCJ0704);' +
				'         END LOOP;' +
				'         CLOSE select_TCJ07;' +
				'      END LOOP;' +
				'      CLOSE select_TCJ02;' +
				'   END LOOP;' +
				'   CLOSE select_TCJ01;'+
				' end;';
			params = [tfj0200,tfj0201,tfj0205,
				tfj0203,tfj0204,tfj0206,tfj0208,
				tfj0209,tfj0211,tfj0212,tfj0213,tfj0214,tfj0216,
				tfj0217,tfj0218,tfj0220,tfj0227,tfj0228,tfj0232,
				tfj0233,tfj0234,tfj0235,tfj0236,tfj0237,tfj0238,
				tfj0239,tfj0240,tfj0241,tfj0243,tfj0244,tfj0249,
				tfj0250,tfj0251,tfj0253,tfj0254,tfj0255,tfj0260,
				tfj0263,tfj0264,tfj0265,tfj0266,tfj0269,tfj0270,
				tfj0276,tfj0277,tfj0278];
		}
		Oracle.queryParam(sql,params,function(err){
			if (err){
				console.log(sql);
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			var result = {
				"data": {"ErpID":tfj0200},
				"message": "添加成功！",
				"status": 200
			}
			res.send(JSON.stringify(result));
		});
	});
}

exports.updateJcd=function (req,res){
	//调用的json: {"Data":{"TFJ0200":0,"TFJ0201":0,"TFJ0206":"","TFJ0227":0,"TFJ0263":0,"TFJ0264":0,"TFJ0265":0,"TFJ0203":""}}
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ0200==null||json.Data.TFJ0201==null||json.Data.TFJ0206==null||json.Data.TFJ0227==null||json.Data.TFJ0263==null||
		json.Data.TFJ0264==null||json.Data.TFJ0265==null||json.Data.TFJ0203==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var tfj0200 = json.Data.TFJ0200;
	var tfj0201 = json.Data.TFJ0201;
	var tfj0206 = json.Data.TFJ0206;
	var tfj0227 = json.Data.TFJ0227;
	var tfj0263 = json.Data.TFJ0263;
	var tfj0264 = json.Data.TFJ0264;
	var tfj0265 = json.Data.TFJ0265;
	var tfj0203 = json.Data.TFJ0203;
	var sql = 'select TFJ0201 from TFJ02 where TFJ0200=:TFJ0200';
	var params = [tfj0200];
	Oracle.queryParam(sql,params,function(err,data){
		if (err) {
			var result = {
				"data": {"ErrSQL": sql},
				"message": "查询数据库错误：" + err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.rows.length<1){
			var result = {
				"data": {"ErrSQL": sql},
				"message": "没有记录！",
				"status": 200
			}
			res.send(JSON.stringify(result));
			return;
		}
		var sql = '';
		var params = [];
		if (tfj0201!=data.rows[0][0]){
			//物资ID发生了改变
			sql =
				' declare'+
				'  v_tfj0200 TFJ02.TFJ0200%TYPE;'+
				'  v_tfj0201 TFJ02.TFJ0201%TYPE;'+
				'  v_tfj0206 TFJ02.TFJ0206%TYPE;'+
				'  v_tfj0227 TFJ02.TFJ0227%TYPE;'+
				'  v_tfj0263 TFJ02.TFJ0263%TYPE;'+
				'  v_tfj0264 TFJ02.TFJ0264%TYPE;'+
				'  v_tfj0265 TFJ02.TFJ0265%TYPE;'+
				'  v_tfj0203 TFJ02.TFJ0203%TYPE;'+
				'  v_tfj0221 TFJ02.TFJ0221%TYPE;'+
				'  v_tfj0222 TFJ02.TFJ0222%TYPE;'+
				'  v_tfj0223 TFJ02.TFJ0223%TYPE;'+
				'  v_tfj0224 TFJ02.TFJ0224%TYPE;'+
				'  v_tfj0225 TFJ02.TFJ0225%TYPE;'+
				'  v_tfj0226 TFJ02.TFJ0226%TYPE;'+
				'  v_tfj0242 TFJ02.TFJ0242%TYPE;'+
				'  v_tfj0252 TFJ02.TFJ0252%TYPE;'+
				' begin'+
				'  select :tfj0200,:tfj0201,:tfj0206,:tfj0227,:tfj0263,:tfj0264,:tfj0265,:tfj0203 into v_tfj0200,v_tfj0201,v_tfj0206,v_tfj0227,v_tfj0263,v_tfj0264,v_tfj0265,v_tfj0203 from dual;'+
				'  select max(trim(T3301)),max(trim(T3338)),max(trim(T3306)),max(trim(T3307)),max(trim(T3308)),max(trim(T3303)),nvl(max(T3366),1),nvl(max(T3304),0)' +
				'  into v_tfj0221,v_tfj0222,v_tfj0223,v_tfj0224,v_tfj0225,v_tfj0226,v_tfj0242,v_tfj0252 from T33 where T3300=v_tfj0201;'+
				'  update TFJ02 set TFJ0201=v_tfj0201,TFJ0206=v_tfj0206,TFJ0227=v_tfj0227,TFJ0263=v_tfj0263,TFJ0264=v_tfj0264,TFJ0265=v_tfj0265,'+
				'  TFJ0203=v_tfj0203,TFJ0221=v_tfj0221,TFJ0222=v_tfj0222,TFJ0223=v_tfj0223,TFJ0224=v_tfj0224,TFJ0225=v_tfj0225,TFJ0226=v_tfj0226,'+
				'  TFJ0242=v_tfj0242,TFJ0252=v_tfj0252 where TFJ0200=v_tfj0200;'+
				' end;';
			params = [tfj0200,tfj0201,tfj0206,tfj0227,tfj0263,tfj0264,tfj0265,tfj0203];
		}else{
			//物资ID没有改变
			sql = 'update TFJ02 set TFJ0206=:TFJ0206,TFJ0227=:TFJ0227,TFJ0263=:TFJ0263,TFJ0264=:TFJ0264,TFJ0265=:TFJ0265,TFJ0203=:TFJ0203 where TFJ0200=:TFJ0200';
			params = [tfj0206,tfj0227,tfj0263,tfj0264,tfj0265,tfj0203,tfj0200];
		}
		Oracle.queryParam(sql,params,function(err){
			if (err){
				console.log(sql);
				var result = {
					"data": {"ErrSQL":sql},
					"message": "查询数据库错误："+ err,
					"status": 300
				}
				res.send(JSON.stringify(result));
				return;
			}
			var result = {
				"data": {},
				"message": "更新成功！",
				"status": 200
			}
			res.send(JSON.stringify(result));
		});
	});
}

exports.deleteTFJ02=function(req,res){
	var json =JSON.parse(req.body.params);
	if (json.Data.TFJ0200==null){
		var result = {
			"data": {},
			"message": "无效的参数!",
			"status": 201
		}
		res.send(JSON.stringify(result));
		return;
	}
	var tfj0200 = json.Data.TFJ0200;
	var sql = 'select TFJ0200 from TFJ02 where TFJ0200=:TFJ0200';
	Oracle.queryParam(sql,[tfj0200],function(err,data){
		if (err) {
			var result = {
				"data": {"ErrSQL": sql},
				"message": "查询数据库错误：" + err,
				"status": 300
			}
			res.send(JSON.stringify(result));
			return;
		}
		if (data.rows.length<1){
			var result = {
				"data": {"ErrSQL": sql},
				"message": "没有记录！",
				"status": 200
			}
			res.send(JSON.stringify(result));
			return;
		}
		var sql = 'delete TFJ02 where TFJ0200=:TFJ0200';
		Oracle.queryParam(sql,[tfj0200],function(err){
			if (err) {
				var result = {
					"data": {"ErrSQL": sql},
					"message": "查询数据库错误：" + err,
					"status": 300
				}
				res.send(JSON.stringify(result));
			}else{
				var result = {
					"data": {},
					"message": "删除成功!",
					"status": 200
				}
				res.send(JSON.stringify(result));
			}
		});
	});
}

exports.insertT75=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.T7501==null||json.Data.T7502==null||json.Data.T7503==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var t7501 = json.Data.T7501;
    var t7502 = json.Data.T7502;
    var t7503 = json.Data.T7503;  
    var sql = 'select SQ_T75.NextVal as T7500 from dual';
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
        var t7500=data.rows[0][0];
        var sql = ' insert into T75(T7500,T7501,T7502,T7503)'+
            ' values(:T7500,:T7501,:T7502,:T7503)';
        var params = [t7500,t7501,t7502,t7503];
        Oracle.queryParam(sql,params,function(err){
            if (err){
                var result = {
                    "data": {"ErrSQL":sql},
                    "message": "查询数据库错误："+ err,
                    "status": 300
                }
                res.send(JSON.stringify(result));
                return;
            } else {
                var result = {
                    "data": {"ErpID":t7500},
                    "message": "添加成功！",
                    "status": 200
                }
                res.send(JSON.stringify(result));
            }
        });        
    });
}

exports.updateT75=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.T7500==null||json.Data.T7501==null||json.Data.T7502==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var t7500 = json.Data.T7500; 
    var t7501 = json.Data.T7501;
    var t7502 = json.Data.T7502;
 
    var sql = 'update T75 set T7501=:T7501,T7502=:T7502 where T7500=:T7500';
    var params = [t7501,t7502,t7500];
    Oracle.queryParam(sql,params,function(err){
        if (err){
            var result = {
                "data": {"ErrSQL":sql},
                "message": "查询数据库错误："+ err,
                "status": 300
            }
            res.send(JSON.stringify(result));
            return;
        }else{
            var result = {
                "data": {},
                "message": "更新成功！",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}

exports.deleteT75=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.T7500){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var t7500 = json.Data.T7500; 
 
    var sql = 'delete from T75 where T7500=:T7500';
    var params = [t7500];
    Oracle.queryParam(sql,params,function(err){
        if (err){
            var result = {
                "data": {"ErrSQL":sql},
                "message": "查询数据库错误："+ err,
                "status": 300
            }
            res.send(JSON.stringify(result));
            return;
        }else{
            var result = {
                "data": {},
                "message": "删除成功！",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}

exports.insertJxmx=function(req,res){
    //  TFJ0201              NUMBER(10)                      not null, 明细项目(物资)ID(T3300)
    //  TFJ0203              CHAR(256)                       not null, 说明
    //  TFJ0204              NUMBER(10)                      not null, 分解检修主表ID(TFJ0100)
    //  TFJ0205              NUMBER(10)                      not null, 模板明细ID(T3900)
    //  TFJ0206              CHAR(50),                                 配件(物资)名称
    //  TFJ0208              NUMBER(5)                       not null, 顺序号
    //  TFJ0209              CHAR(20),                                 工作号
    //  TFJ0211              NUMBER(5),                                检修表位
    //  TFJ0212              NUMBER(10)                      not null, 工厂生产工序ID(TSZ2300)
    //  TFJ0213              NUMBER(5,2),                              工厂工时定额
    //  TFJ0214              NUMBER(10)                      not null, 领料单位(车间)ID(TSZ2900)
    //  TFJ0216              NUMBER(15,4),                             更换数量
    //  TFJ0217              NUMBER(15,4),                             检修数量
    //  TFJ0218              NUMBER(15,4),                             新制数量
    //  TFJ0220              CHAR(20)                        not null, 页号
    //  TFJ0227              NUMBER(15,4),                             应有数量
    //  TFJ0228              CHAR(40),                                 分解材料物资规格
    //  TFJ0232              NUMBER(2)                       not null, 新增项目(0是 1否)
    //  TFJ0233              VARCHAR2(20),                             工厂工艺路线简称
    //  TFJ0234              FLOAT                          default 0, 配件面积
    //  TFJ0235              FLOAT                          default 0, 考漆或喷塑(1烤漆 2喷塑 3油漆)
    //  TFJ0236              NUMBER(1)                      default 0, 选装标志(0否 1是)
    //  TFJ0237              FLOAT                          default 0, 重量
    //  TFJ0238              FLOAT                          default 0, 比重
    //  TFJ0239              NUMBER(1)                      default 0, 净材标志(0否 1硬木 2软木 3华南硬木)
    //  TFJ0240              VARCHAR2(10),                             检修计量单位
    //  TFJ0241              FLOAT                          default 0, 配件体积
    //  TFJ0243              FLOAT,                                    配件长度
    //  TFJ0244              NUMBER(10),                               供货厂商ID
    //  TFJ0249              FLOAT,                                    喷塑烤漆面积
    //  TFJ0250              NUMBER(1),                                物料属性(TJS0546)
    //  TFJ0251              NUMBER(15,4),                             拆损数
    //  TFJ0253              VARCHAR2(6),                              送件标志
    //  TFJ0254              NUMBER(10),                               实际领料单位ID
    //  TFJ0255              VARCHAR2(20),                             招标分类(TFJ4702)
    //  TFJ0260              NUMBER(1)                      default 0, 接车标志(0 否 1 是)
    //  TFJ0263              NUMBER(15,4)                   default 0, 缺少数量
    //  TFJ0264              NUMBER(1)                      default 0, 要求加装(0 无 1 否 2 是)
    //  TFJ0265              NUMBER(1),                                是否收费(0 无 1 否 2 是)
    //  TFJ0266              NUMBER(1)                      default 0, 检修分类(0 正常检修 1 合同要求 2 段改保修)
    //  TFJ0269              NUMBER(1)                      default 0, 检修项目选中
    //  TFJ0270              NUMBER(1)                      default 0, 数据状态
    //  TFJ0276              VARCHAR2(255),                            入厂状态(机车)
    //  TFJ0277              VARCHAR2(255),                            会议决议(机车)
    //  TFJ0278              VARCHAR2(254),                            车间补充备注
    var json =JSON.parse(req.body.params);
    if (json.Data.TFJ0201==null||json.Data.TFJ0203==null||json.Data.TFJ0204==null||json.Data.TFJ0205==null||json.Data.TFJ0206==null||json.Data.TFJ0208==null||
        json.Data.TFJ0209==null||json.Data.TFJ0211==null||json.Data.TFJ0212==null||json.Data.TFJ0213==null||json.Data.TFJ0214==null||json.Data.TFJ0216==null||
        json.Data.TFJ0217==null||json.Data.TFJ0218==null||json.Data.TFJ0220==null||json.Data.TFJ0227==null||json.Data.TFJ0228==null||json.Data.TFJ0232==null||
        json.Data.TFJ0233==null||json.Data.TFJ0234==null||json.Data.TFJ0235==null||json.Data.TFJ0236==null||json.Data.TFJ0237==null||json.Data.TFJ0238==null||
        json.Data.TFJ0239==null||json.Data.TFJ0240==null||json.Data.TFJ0241==null||json.Data.TFJ0243==null||json.Data.TFJ0244==null||json.Data.TFJ0249==null||
        json.Data.TFJ0250==null||json.Data.TFJ0251==null||json.Data.TFJ0253==null||json.Data.TFJ0254==null||json.Data.TFJ0255==null||json.Data.TFJ0260==null||
        json.Data.TFJ0263==null||json.Data.TFJ0264==null||json.Data.TFJ0265==null||json.Data.TFJ0266==null||json.Data.TFJ0269==null||json.Data.TFJ0270==null||
        json.Data.TFJ0276==null||json.Data.TFJ0277==null||json.Data.TFJ0278==null
    ){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var tfj0201 = json.Data.TFJ0201, tfj0203 = json.Data.TFJ0203, tfj0204 = json.Data.TFJ0204, tfj0205 = json.Data.TFJ0205,tfj0206 = json.Data.TFJ0206, tfj0208 = json.Data.TFJ0208;
    var tfj0209 = json.Data.TFJ0209, tfj0211 = json.Data.TFJ0211, tfj0212 = json.Data.TFJ0212, tfj0213 = json.Data.TFJ0213,tfj0214 = json.Data.TFJ0214, tfj0216 = json.Data.TFJ0216;
    var tfj0217 = json.Data.TFJ0217, tfj0218 = json.Data.TFJ0218, tfj0220 = json.Data.TFJ0220, tfj0227 = json.Data.TFJ0227,tfj0228 = json.Data.TFJ0228, tfj0232 = json.Data.TFJ0232;
    var tfj0233 = json.Data.TFJ0233, tfj0234 = json.Data.TFJ0234, tfj0235 = json.Data.TFJ0235, tfj0236 = json.Data.TFJ0236,tfj0237 = json.Data.TFJ0237, tfj0238 = json.Data.TFJ0238;
    var tfj0239 = json.Data.TFJ0239, tfj0240 = json.Data.TFJ0240, tfj0241 = json.Data.TFJ0241, tfj0243 = json.Data.TFJ0243,tfj0244 = json.Data.TFJ0244, tfj0249 = json.Data.TFJ0249;
    var tfj0250 = json.Data.TFJ0250, tfj0251 = json.Data.TFJ0251, tfj0253 = json.Data.TFJ0253, tfj0254 = json.Data.TFJ0254,tfj0255 = json.Data.TFJ0255, tfj0260 = json.Data.TFJ0260;
    var tfj0263 = json.Data.TFJ0263, tfj0264 = json.Data.TFJ0264, tfj0265 = json.Data.TFJ0265, tfj0266 = json.Data.TFJ0266,tfj0269 = json.Data.TFJ0269, tfj0270 = json.Data.TFJ0270;
    var tfj0276 = json.Data.TFJ0276, tfj0277 = json.Data.TFJ0277, tfj0278 = json.Data.TFJ0278;
    //取主键
    var sql = 'select TFJ0200.NextVal as TFJ0200,(select nvl(max(TFJ0211),0) + 1 from TFJ02 where TFJ0204=:TFJ0204 and TFJ0220=:TFJ0220)as TFJ0211 from dual';
    var params = [tfj0204,tfj0220];
    Oracle.queryParam(sql,params,function(err,data) {
        if (err) {
            var result = {
                "data": {"ErrSQL": sql},
                "message": "查询数据库错误：" + err,
                "status": 300
            }
            res.send(JSON.stringify(result));
            return;
        }
        var tfj0200 = data.rows[0][0];
        var params = [];
        var sql = '';
        if (tfj0211 <= 0) {
            tfj0211 = data.rows[0][1];
        }

        sql =
            ' insert into TFJ02 (TFJ0200,' +
            ' TFJ0201,TFJ0203,TFJ0204,TFJ0205,TFJ0206,TFJ0208,'+
            ' TFJ0209,TFJ0211,TFJ0212,TFJ0213,TFJ0214,TFJ0216,'+
            ' TFJ0217,TFJ0218,TFJ0220,TFJ0227,TFJ0228,TFJ0232,'+
            ' TFJ0233,TFJ0234,TFJ0235,TFJ0236,TFJ0237,TFJ0238,'+
            ' TFJ0239,TFJ0240,TFJ0241,TFJ0243,TFJ0244,TFJ0249,'+
            ' TFJ0250,TFJ0251,TFJ0253,TFJ0254,TFJ0255,TFJ0260,'+
            ' TFJ0263,TFJ0264,TFJ0265,TFJ0266,TFJ0269,TFJ0270,'+
            ' TFJ0276,TFJ0277,TFJ0278,'+
            //下面是物资信息
            ' TFJ0221,TFJ0222,TFJ0223,TFJ0224,TFJ0225,TFJ0226,' +
            ' TFJ0207,TFJ0219,TFJ0210,TFJ0229,TFJ0230,TFJ0231,' +
            ' TFJ0242,TFJ0245,TFJ0247,TFJ0261,TFJ0252,TFJ0271,' +
            ' TFJ0272)' +
            //以物资信息为基础添加TFJ02表
            ' select :TFJ0200,' +
            ' :TFJ0201,:TFJ0203,:TFJ0204,:TFJ0205,:TFJ0206,:TFJ0208,'+
            ' :TFJ0209,:TFJ0211,:TFJ0212,:TFJ0213,:TFJ0214,:TFJ0216,'+
            ' :TFJ0217,:TFJ0218,:TFJ0220,:TFJ0227,:TFJ0228,:TFJ0232,'+
            ' :TFJ0233,:TFJ0234,:TFJ0235,:TFJ0236,:TFJ0237,:TFJ0238,'+
            ' :TFJ0239,:TFJ0240,:TFJ0241,:TFJ0243,:TFJ0244,:TFJ0249,'+
            ' :TFJ0250,:TFJ0251,:TFJ0253,:TFJ0254,:TFJ0255,:TFJ0260,'+
            ' :TFJ0263,:TFJ0264,:TFJ0265,:TFJ0266,:TFJ0269,:TFJ0270,'+
            ' :TFJ0276,:TFJ0277,:TFJ0278,'+
            //下面是物资信息
            ' max(trim(T3301)),max(trim(T3338)),max(trim(T3306)),max(trim(T3307)),max(trim(T3308)),max(trim(T3303)),'+
            ' 0,0,0,null,null,null,'+
            ' nvl(max(T3366),1),0,0,null,nvl(max(T3304),0),null,' +
            ' null from T33 where T3300=:T3300';
        params = [tfj0200,
            tfj0201,tfj0203,tfj0204,tfj0205,tfj0206,tfj0208,
            tfj0209,tfj0211,tfj0212,tfj0213,tfj0214,tfj0216,
            tfj0217,tfj0218,tfj0220,tfj0227,tfj0228,tfj0232,
            tfj0233,tfj0234,tfj0235,tfj0236,tfj0237,tfj0238,
            tfj0239,tfj0240,tfj0241,tfj0243,tfj0244,tfj0249,
            tfj0250,tfj0251,tfj0253,tfj0254,tfj0255,tfj0260,
            tfj0263,tfj0264,tfj0265,tfj0266,tfj0269,tfj0270,
            tfj0276,tfj0277,tfj0278,tfj0201];
   
        Oracle.queryParam(sql,params,function(err){
            if (err){
                console.log(sql);
                var result = {
                    "data": {"ErrSQL":sql},
                    "message": "查询数据库错误："+ err,
                    "status": 300
                }
                res.send(JSON.stringify(result));
                return;
            }
            var result = {
                "data": {"ErpID":tfj0200},
                "message": "添加成功！",
                "status": 200
            }
            res.send(JSON.stringify(result));
        });
    });
}

exports.updateJxmx=function(req,res){
    var result = {
        "data": {"ErpID":tfj0200},
        "message": "开发中！",
        "status": 200
    }
}

exports.insertTCJ05=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.TCJ0501==null||json.Data.TCJ0502==null||json.Data.TCJ0503==null
        ||json.Data.TCJ0504==null||json.Data.TCJ0506==null||json.Data.TCJ0507==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var tcj0501 = json.Data.TCJ0501;
    var tcj0502 = json.Data.TCJ0502;
    var tcj0503 = json.Data.TCJ0503; 
    var tcj0504 = json.Data.TCJ0504;
    var tcj0505 = json.Data.TCJ0505;
    var tcj0506 = json.Data.TCJ0506;
    var tcj0507 = json.Data.TCJ0507; 

    var sql = 'select TCJ0500.NextVal as TCJ0500 from dual';
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
        var tcj0500=data.rows[0][0];
        var sql = ' declare'+
            ' TTSZ2904 varchar2(4);'+
            ' gyls_str varchar2(2000);'+
            ' TTFJ0200 number(10) := :TFJ0200;'+
            ' cursor select_TSZ29 is select trim(TSZ2904) from TSZ29,TCJ05 where '+
            ' TSZ2900=TCJ0502 and TCJ0501=TTFJ0200 order by TCJ0503,TCJ0500;'+
            ' begin'+
            ' insert into TCJ05(TCJ0500,TCJ0501,TCJ0502,TCJ0503,TCJ0504,TCJ0505,TCJ0506,TCJ0507)'+
            ' values(:TCJ0500,TTFJ0200,:TCJ0502,:TCJ0503,:TCJ0504,:TCJ0505,:TCJ0506,:TCJ0507);'+
            ' gyls_str:=\'\';'+
            ' open select_TSZ29;'+
            ' loop'+
            '    fetch select_TSZ29 into TTSZ2904;'+
            '    exit when select_TSZ29%notfound;'+
            '    gyls_str:=gyls_str||trim(TTSZ2904);'+
            ' end loop;'+
            ' close select_TSZ29;'+
            ' update TFJ02 set TFJ0233 = gyls_str where TFJ0200=TTFJ0200;'+
            ' end;';
        var params = [tcj0501,tcj0500,tcj0502,tcj0503,tcj0504,tcj0505,tcj0506,tcj0507];
        Oracle.queryParam(sql,params,function(err){
            if (err){
                var result = {
                    "data": {"ErrSQL":sql},
                    "message": "查询数据库错误："+ err,
                    "status": 300
                }
                res.send(JSON.stringify(result));
                return;
            } else {
                var result = {
                    "data": {"ErpID":tcj0500},
                    "message": "添加成功！",
                    "status": 200
                }
                res.send(JSON.stringify(result));
            }
        });        
    });
}

exports.updateTCJ05=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.TCJ0500==null||json.Data.TCJ0502==null||json.Data.TCJ0503==null
        ||json.Data.TCJ0504==null||json.Data.TCJ0505==null||json.Data.TCJ0506==null
        ||json.Data.TCJ0507==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var tcj0500 = json.Data.TCJ0500;
    var tcj0502 = json.Data.TCJ0502;
    var tcj0503 = json.Data.TCJ0503;
    var tcj0504 = json.Data.TCJ0504;
    var tcj0505 = json.Data.TCJ0505;
    var tcj0506 = json.Data.TCJ0506;
    var tcj0507 = json.Data.TCJ0507;

    var sql = ' declare'+
        ' TTCJ0501 number(10);'+
        ' TTSZ2904 varchar2(4);'+
        ' gyls_str varchar2(2000);'+
        ' TTCJ0500 number(10) := :TCJ0500;'+        
        ' cursor select_TSZ29 is select trim(TSZ2904) from TSZ29,TCJ05 where '+
        ' TSZ2900=TCJ0502 and TCJ0501=TTCJ0501 order by TCJ0503,TCJ0500;'+
        ' begin'+
        ' select TCJ0501 into TTCJ0501 from TCJ05 where TCJ0500=TTCJ0500;'+
        ' update TCJ05 set TCJ0502=:TCJ0502,TCJ0503=:TCJ0503,TCJ0504=:TCJ0504,TCJ0505=:TCJ0505,TCJ0506=:TCJ0506,TCJ0507=:TCJ0507 where TCJ0500=TTCJ0500;'+
        ' gyls_str:=\'\';'+
        ' open select_TSZ29;'+
        ' loop'+
        '    fetch select_TSZ29 into TTSZ2904;'+
        '    exit when select_TSZ29%notfound;'+
        '    gyls_str:=gyls_str||trim(TTSZ2904);'+
        ' end loop;'+
        ' close select_TSZ29;'+
        ' update TFJ02 set TFJ0233 = gyls_str where TFJ0200=TTCJ0501;'+
        ' end;';
    var params = [tcj0500,tcj0502,tcj0503,tcj0504,tcj0505,tcj0506,tcj0507];
    Oracle.queryParam(sql,params,function(err){
        if (err){
            var result = {
                "data": {"ErrSQL":sql},
                "message": "查询数据库错误："+ err,
                "status": 300
            }
            res.send(JSON.stringify(result));
            return;
        }else{
            var result = {
                "data": {},
                "message": "更新成功！",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}

exports.deleteTCJ05=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.TCJ0500==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var tcj0500 = json.Data.TCJ0500; 
 
    var sql = ' declare'+
        ' TTCJ0501 number(10);'+
        ' TTSZ2904 varchar2(4);'+
        ' gyls_str varchar2(2000);'+
        ' TTCJ0500 number(10) := :TCJ0500;'+
        ' cursor select_TSZ29 is select trim(TSZ2904) from TSZ29,TCJ05 where '+
        ' TSZ2900=TCJ0502 and TCJ0501=TTCJ0501 order by TCJ0503,TCJ0500;'+
        ' begin'+
        ' select TCJ0501 into TTCJ0501 from TCJ05 where TCJ0500=TTCJ0500;'+
        ' delete from TCJ05 where TCJ0500=TTCJ0500;'+
        ' gyls_str:=\'\';'+
        ' open select_TSZ29;'+
        ' loop'+
        '    fetch select_TSZ29 into TTSZ2904;'+
        '    exit when select_TSZ29%notfound;'+
        '    gyls_str:=gyls_str||trim(TTSZ2904);'+
        ' end loop;'+
        ' close select_TSZ29;'+
        ' update TFJ02 set TFJ0233 = gyls_str where TFJ0200=TTCJ0501;'+
        ' end;';
    var params = [tcj0500];
    Oracle.queryParam(sql,params,function(err){
        if (err){
            var result = {
                "data": {"ErrSQL":sql},
                "message": "查询数据库错误："+ err,
                "status": 300
            }
            res.send(JSON.stringify(result));
            return;
        }else{
            var result = {
                "data": {},
                "message": "删除成功！",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}

exports.insertTCJ06=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.TCJ0600==null||json.Data.TCJ0601==null||json.Data.TCJ0602==null
        ||json.Data.TCJ0603==null||json.Data.TCJ0604==null||json.Data.TCJ0605==null
        ||json.Data.TCJ0606==null||json.Data.TCJ0607==null||json.Data.TCJ0608==null
        ||json.Data.TCJ0609==null||json.Data.TCJ0610==null||json.Data.TCJ0611==null
        ||json.Data.TCJ0612==null||json.Data.TCJ0613==null||json.Data.TCJ0614==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }

    var tcj0600 = json.Data.TCJ0600;
    var tcj0601 = json.Data.TCJ0601;
    var tcj0602 = json.Data.TCJ0602;
    var tcj0603 = json.Data.TCJ0603;
    var tcj0604 = json.Data.TCJ0604;
    var tcj0605 = json.Data.TCJ0605;
    var tcj0606 = json.Data.TCJ0606;
    var tcj0607 = json.Data.TCJ0607;
    var tcj0608 = json.Data.TCJ0608;
    var tcj0609 = json.Data.TCJ0609;
    var tcj0610 = json.Data.TCJ0610;
    var tcj0611 = json.Data.TCJ0611;
    var tcj0612 = json.Data.TCJ0612;
    var tcj0613 = json.Data.TCJ0613;
    var tcj0614 = json.Data.TCJ0614;

    var sql = 'select TCJ0600.NextVal as TCJ0600 from dual';
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
        var tcj0600=data.rows[0][0];
        var sql = ' insert into TCJ06(TCJ0600,TCJ0601,TCJ0602,TCJ0603,TCJ0604,TCJ0605,TCJ0606,TCJ0607,TCJ0608,TCJ0609,TCJ0610,TCJ0611,TCJ0612,TCJ0613,TCJ0614)'+
                  ' values(:TCJ0600,:TCJ0601,:TCJ0602,:TCJ0603,:TCJ0604,:TCJ0605,:TCJ0606,:TCJ0607,:TCJ0608,:TCJ0609,:TCJ0610,:TCJ0611,:TCJ0612,:TCJ0613,:TCJ0614)';
        var params = [tcj0600,tcj0601,tcj0602,tcj0603,tcj0604,tcj0605,tcj0606,tcj0607,tcj0608,tcj0609,tcj0610,tcj0611,tcj0612,tcj0613,tcj0614];
        Oracle.queryParam(sql,params,function(err){
            if (err){
                var result = {
                    "data": {"ErrSQL":sql},
                    "message": "查询数据库错误："+ err,
                    "status": 300
                }
                res.send(JSON.stringify(result));
                return;
            } else {
                var result = {
                    "data": {"ErpID":tcj0600},
                    "message": "添加成功！",
                    "status": 200
                }
                res.send(JSON.stringify(result));
            }
        });
    });
}

exports.updateTCJ06=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.TCJ0600==null||json.Data.TCJ0602==null||json.Data.TCJ0603==null
        ||json.Data.TCJ0604==null||json.Data.TCJ0605==null||json.Data.TCJ0606==null
        ||json.Data.TCJ0607==null||json.Data.TCJ0608==null||json.Data.TCJ0609==null
        ||json.Data.TCJ0610==null||json.Data.TCJ0611==null||json.Data.TCJ0612==null
        ||json.Data.TCJ0613==null||json.Data.TCJ0614==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var tcj0600 = json.Data.TCJ0600;
    var tcj0602 = json.Data.TCJ0602;
    var tcj0603 = json.Data.TCJ0603;
    var tcj0604 = json.Data.TCJ0604;
    var tcj0605 = json.Data.TCJ0605;
    var tcj0606 = json.Data.TCJ0606;
    var tcj0607 = json.Data.TCJ0607;
    var tcj0608 = json.Data.TCJ0608;
    var tcj0609 = json.Data.TCJ0609;
    var tcj0610 = json.Data.TCJ0610;
    var tcj0611 = json.Data.TCJ0611;
    var tcj0612 = json.Data.TCJ0612;
    var tcj0613 = json.Data.TCJ0613;
    var tcj0614 = json.Data.TCJ0614;

    var sql = ' update TCJ06 set TCJ0602=:TCJ0602,TCJ0603=:TCJ0603,TCJ0604=:TCJ0604,TCJ0605=:TCJ0605,TCJ0606=:TCJ0606,'+
              ' TCJ0607=:TCJ0607,TCJ0608=:TCJ0608,TCJ0609=:TCJ0609,TCJ0610=:TCJ0610,TCJ0611=:TCJ0611,TCJ0612=:TCJ0612,'+
              ' TCJ0613=:TCJ0613,TCJ0614=:TCJ0614 where TCJ0600=:TCJ0600';

    var params = [tcj0602,tcj0603,tcj0604,tcj0605,tcj0606,tcj0607,tcj0608,tcj0609,tcj0610,tcj0611,tcj0612,tcj0613,tcj0614,tcj0600];
    Oracle.queryParam(sql,params,function(err){
        if (err){
            var result = {
                "data": {"ErrSQL":sql},
                "message": "查询数据库错误："+ err,
                "status": 300
            }
            res.send(JSON.stringify(result));
            return;
        }else{
            var result = {
                "data": {},
                "message": "更新成功！",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}

exports.deleteTCJ06=function(req,res){
    var json =JSON.parse(req.body.params);
    if (json.Data.TCJ0500==null){
        var result = {
            "data": {},
            "message": "无效的参数!",
            "status": 201
        }
        res.send(JSON.stringify(result));
        return;
    }
    var tcj0600 = json.Data.TCJ0600; 
 
    var sql = 'delete from TCJ06 where TCJ0600=:TCJ0600';
    var params = [tcj0600];
    Oracle.queryParam(sql,params,function(err){
        if (err){
            var result = {
                "data": {"ErrSQL":sql},
                "message": "查询数据库错误："+ err,
                "status": 300
            }
            res.send(JSON.stringify(result));
            return;
        }else{
            var result = {
                "data": {},
                "message": "删除成功！",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}