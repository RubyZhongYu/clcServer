'use strict';
/*****************
 * 参数验证中间件
 ****************/
var verify = require('../lib/utils/verify');
var respond = require('../lib/utils/respond');
var config = require('../config');



function existsSubStr(str,subStr){
    return str.indexOf(subStr) >= 0;
}

//验证参数非空
exports.paramRequired = function (req, res, next) {
    //请求形式-> post请求
    if(req.method=='POST'||!verify.isOwnEmptyObject(req.body)) {
        if (config.debug){
            console.log('****** req.params ******');
            console.log(req.body.params);
        }
        if (req.body.params == null) {
            var result = {
                "data": {},
                "message": "缺少参数:params",
                "status": 201
            }
            res.send(JSON.stringify(result));
            return;
        }
        var params = req.body.params;
        var json = {};
        try {
            json = JSON.parse(params);
        } catch (err) {
            var result = {
                "data": {},
                "message": "json转换失败:" + params,
                "status": 201
            }
            res.send(JSON.stringify(result));
            return;
        }  
        //修改json->machine
        if (json.MachineCode!=null&&(json.MachineCode=''||json.MachineCode=='空'||json.MachineCode=='null')){
            json.MachineCode=req.ip;
        }

        if (json.Data==null){
            var result = {
                "data": {},
                "message": "json格式错误",
                "status": 201
            }
            res.send(JSON.stringify(result));
            return;
        }
    }
	next();//将控制权转移
};