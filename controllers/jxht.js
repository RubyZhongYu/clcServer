/*细录预算模块*/
var Oracle = require('../lib/db/oracle').clcApp;
var gFunc = require('../lib/utils/respond');

exports.getT07=function (req,res) {
    var json =JSON.parse(req.body.params);
    var t0700 = 0;
    if (json.Data.T0700!=null){
        t0700 = json.Data.T0700;
    }
    var treeShow = false;
    if (json.Data.TreeShow!=null&&json.Data.TreeShow==1){
        treeShow = true;
    }
    var sql = '';
    var params = [];
    if (t0700!=0){
        sql = ' select T0700,trim(T0701)as T0701,trim(T0702)as T0702,trim(T0703)as T0703,T0704,T0705,'+
            ' T0706,T0707,T0708,T0709,T0710,T0711,T0712 from T07 where T0705=:T0705 or T0706 like :T0706 order by T0705,T0701';
        params = [t0700,"%;"+t0700+";%"];
    }else{
        sql = ' select T0700,trim(T0701)as T0701,trim(T0702)as T0702,trim(T0703)as T0703,T0704,T0705,'+
              ' T0706,T0707,T0708,T0709,T0710,T0711,T0712 from T07 order by T0705,T0701';
        params = [];
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
                "data": treeShow?gFunc.transData(gFunc.oracleRowsToJson(data), "T0700", "T0705", "Childs"):gFunc.oracleRowsToJson(data),
                "message": "查询车型列表成功!",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}

exports.getT02=function (req,res) {
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
    var t0200 = 0;
    if (json.Data.T0200!=null&&json.Data.T0200!=0){
        t0200 = json.Data.T0200;
    }
    var sql = '';
    var params = [];
    if (t0200!=0){
        sql = ' select T0200,T0201,T0202,trim(T0203)as T0203,trim(T0204)as T0204,T0219,trim(T0205)as T0205,T0220,'+
              ' trim(T0206)as T0206,T0221,trim(T0207)as T0207,to_char(T0208,\'YYYY-MM-DD\')as T0208,to_char(T0209,\'YYYY-MM-DD\')as T0209,'+
              ' to_char(T0210,\'YYYY-MM-DD\')as T0210,to_char(T0211,\'YYYY-MM-DD\')as T0211,to_char(T0212,\'YYYY-MM-DD\')as T0212,to_char(T0213,\'YYYY-MM-DD\')as T0213,'+
              ' T0217,T0215,T0216,T0217,T0218,T0222,T0223,T0225,T0226,to_char(T0227,\'YYYY-MM-DD\')as T0227,T0228,to_char(T0229,\'YYYY-MM-DD\')as T0229,'+
              ' to_char(T0230,\'YYYY-MM-DD\')as T0230,to_char(T0231,\'YYYY-MM-DD\')as T0231,T0232,T0233,trim(T0234)as T0234,trim(T0224)as T0224,T0235,'+
              ' to_char(T0236,\'YYYY-MM-DD\')as T0236,T0237,to_char(T0238,\'YYYY-MM-DD\')as T0238,T0239,T0240,T0242,T0243,T0244,EXPTAG,'+
              ' cast(T0241 as varchar2(256))as T0241,'+
              ' to_char(T0245,\'YYYY-MM-DD\')as T0245,to_char(T0246,\'YYYY-MM-DD\')as T0246,to_char(T0247,\'YYYY-MM-DD\')as T0247,to_char(T0248,\'YYYY-MM-DD\')as T0248,'+
              ' T0249,to_char(T0250,\'YYYY-MM-DD\')as T0250,T0251,trim(T0252)as T0252,T0253 from T02 where T0200=:T0200';
        params = [t0200];
    }else{
        sql = ' select T0200,T0201,T0202,trim(T0203)as T0203,trim(T0204)as T0204,T0219,trim(T0205)as T0205,T0220,'+
            ' trim(T0206)as T0206,T0221,trim(T0207)as T0207,to_char(T0208,\'YYYY-MM-DD\')as T0208,to_char(T0209,\'YYYY-MM-DD\')as T0209,'+
            ' to_char(T0210,\'YYYY-MM-DD\')as T0210,to_char(T0211,\'YYYY-MM-DD\')as T0211,to_char(T0212,\'YYYY-MM-DD\')as T0212,to_char(T0213,\'YYYY-MM-DD\')as T0213,'+
            ' T0217,T0215,T0216,T0217,T0218,T0222,T0223,T0225,T0226,to_char(T0227,\'YYYY-MM-DD\')as T0227,T0228,to_char(T0229,\'YYYY-MM-DD\')as T0229,'+
            ' to_char(T0230,\'YYYY-MM-DD\')as T0230,to_char(T0231,\'YYYY-MM-DD\')as T0231,T0232,T0233,trim(T0234)as T0234,trim(T0224)as T0224,T0235,'+
            ' to_char(T0236,\'YYYY-MM-DD\')as T0236,T0237,to_char(T0238,\'YYYY-MM-DD\')as T0238,T0239,T0240,T0241,T0242,T0243,T0244,EXPTAG,'+
            ' to_char(T0245,\'YYYY-MM-DD\')as T0245,to_char(T0246,\'YYYY-MM-DD\')as T0246,to_char(T0247,\'YYYY-MM-DD\')as T0247,to_char(T0248,\'YYYY-MM-DD\')as T0248,'+
            ' T0249,to_char(T0250,\'YYYY-MM-DD\')as T0250,T0251,trim(T0252)as T0252,T0253 from T02 where T0202 in(select T0700 from T07 where T0700=:T0700 or T0706 like :T0706) order by T0204';
        params = [t0700,"%;"+t0700+";%"];
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
                "message": "查询车辆信息列表成功!",
                "status": 200
            }
            res.send(JSON.stringify(result));
        }
    });
}