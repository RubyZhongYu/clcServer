/**
* 使用redis的session库模块
*/
'use strict';

var mysql = require('../db/mysql.js').default;
var cache = require('../../lib/cache/redis');
var Uuid = require('../../lib/utils/uuid');
var moment = require('moment');
var liveTime = 30 * 24 * 60 * 60;

exports.liveTime = liveTime;
/**
* 用户登录后保存session
* @method addSession 
* @param {String} userID  用户ID
*@machineCode {String} 唯一码
* @return {String} GUID
*/
exports.addSession = function (userId,ip,machineCode,cb) {
    var userID = Number(userId);
    var sessionID = Uuid.create().replace(/\-/gi,'');
    var sessionInfo = {userID: userID,machineCode: machineCode,updateTime: moment().format('YYYY-MM-DD HH:mm:ss')};
    var _sessionID = 's:'+ sessionID;
    cache.set(_sessionID,sessionInfo,liveTime);
    var json ={"sessionID":sessionID,"state":0};
    //判断是否在别处登录
    var _userID = 'u:'+ userId;
    cache.get(_userID,function(err,data){
        if(!err&&data){
            if (data.machineCode!=machineCode){
                json.state = 1;
            }
            _sessionID = 's:'+ data.sessionID;
            var sessionInfo = {sessionID: sessionID,machineCode: machineCode,updateTime: moment().format('YYYY-MM-DD HH:mm:ss')};
            //删除原来的话会id数据
            cache.del(_sessionID,function(){
                //删除原来的用户id数据
                cache.del(_userID,function(){
                    //新增用户id数据
                    cache.set(_userID,sessionInfo,liveTime,function(){
                        return cb(json);
                    });
                });
            });
        } else {
            var sessionInfo = {sessionID: sessionID,machineCode: machineCode,updateTime: moment().format('YYYY-MM-DD HH:mm:ss')};
            //新增用户id数据
            cache.set(_userID,sessionInfo,liveTime,function(){
                return cb(json);
            });            
        }
    });
};

/**
* 移除用户的session
* @method removeSession
* @param {String} sessionID  
*/
exports.removeSession = function (sessionID,cb) {
    var infoKey = 's:'+ sessionID;
    cache.get(infoKey,function(err,info){
        if(err){
            return cb(err);
        } else {
            if(info){
                var userKey = 'u:'+ info.userID;
                cache.del(infoKey,function(){
                    //删除原来的用户id数据
                    cache.del(userKey,function(){
                        return cb();
                    });
                });
            } else {
                return cb();
            }
        }
    });
};

/**

/**
* 用户是否在线效证
* @method checkSession 
* @param {Object} res respose对象
*/
exports.checkSession = function (req,res,next) {
    var json = JSON.parse(req.body.params);
    var sessionID = json.SessionID;
    var userID = json.Data.UserID;
    var infoKey = 's:'+ sessionID;
    cache.get(infoKey,function(err,info){
        if (err){
            var result = {
                "data": {},
                "message": "登录状态失效，请重新登录",
                "status": 202
            }
            res.send(JSON.stringify(result));
        } else {
            if (!info){
                console.log('登录状态失效'+ infoKey);
                var result = {
                    "data": {},
                    "message": "登录状态失效，请重新登录",
                    "status": 202
                }
                res.send(JSON.stringify(result));
            } else {
                if (userID!=info.userID){
                    console.log('info.userID='+ info.userID +' => userID='+ userID);
                    var result = {
                        "data": {},
                        "message":'您的帐号在另一地点登录，请重新登录。(注：如果这不是您本人操作，请注意帐号安全)',
                        "status": 202
                    }
                    res.send(JSON.stringify(result));
                } else {
                    cache.expire(infoKey,liveTime);
                    cache.expire('u'+ userID,liveTime);
                    next();
                }
            }
        }
    });
}

/**
* 代理商登录后保存session
* @method addAgentSession 
* @param {String} agentId  用户ID
* @machineCode {String} 唯一码
* @return {String} GUID
*/
exports.addAgentSession = function (agentId,ip,machineCode,cb) {
    var agentID = Number(agentId);
    var sessionID = Uuid.create().replace(/\-/gi,'');
    var sessionInfo = {agentID: agentID,machineCode: machineCode,updateTime: moment().format('YYYY-MM-DD HH:mm:ss')};
    var _sessionID = 'sa:'+ sessionID;
    cache.set(_sessionID,sessionInfo,liveTime);
    var json ={"sessionID":sessionID,"state":0};
    //判断是否在别处登录
    var _agentID = 'ua:'+ agentID;
    cache.get(_agentID,function(err,data){
        if(!err&&data){
            if (data.machineCode!=machineCode){
                json.state = 1;
            }
            _sessionID = 'sa:'+ data.sessionID;
            var sessionInfo = {sessionID: sessionID,machineCode: machineCode,updateTime: moment().format('YYYY-MM-DD HH:mm:ss')};
            //删除原来的话会id数据
            cache.del(_sessionID,function(err){
                if (err){
                    console.log('删除原来的话会id数据:'+ err);
                }
                //删除原来的用户id数据
                cache.del(_agentID,function(err){
                    if (err){
                        console.log('删除原来的用户id数据:'+ err);
                    }                    
                    //新增用户id数据
                    cache.set(_agentID,sessionInfo,liveTime,function(err){
                        if (err){
                            console.log('新增用户id数据:'+ err);
                        }                          
                        return cb(json);
                    });
                });
            });
        } else {
            var sessionInfo = {sessionID: sessionID,machineCode: machineCode,updateTime: moment().format('YYYY-MM-DD HH:mm:ss')};
            //新增用户id数据
            cache.set(_agentID,sessionInfo,liveTime,function(){
                return cb(json);
            });            
        }
    });
};

/**
* 移除代理商的session
* @method removeSession
* @param {String} sessionID  
*/
exports.removeAgentSession = function (sessionID,cb) {
    var infoKey = 'sa:'+ sessionID;
    cache.get(infoKey,function(err,info){
        if(err){
            return cb(err);
        } else {
            if(info){
                var userKey = 'ua:'+ info.agentID;
                cache.del(infoKey,function(){
                    //删除原来的用户id数据
                    cache.del(userKey,function(){
                        return cb();
                    });
                });
            } else {
                return cb();
            }
        }
    });
};


/**
* 代理商是否在线效证
* @method checkSession 
* @param {Object} res respose对象
*/
exports.checkAgentSession = function (req,res,next) {
    var json = JSON.parse(req.body.params);
    var sessionID = json.SessionID;
    var agentID = json.Data.AgentID;
    var infoKey = 'sa:'+ sessionID;
    cache.get(infoKey,function(err,info){
        if (err){
            var result = {
                "data": {},
                "message": "登录状态失效，请重新登录",
                "status": 202
            }
            res.send(JSON.stringify(result));
        } else {
            if (!info){
                console.log('登录状态失效'+ infoKey);
                var result = {
                    "data": {},
                    "message": "登录状态失效，请重新登录",
                    "status": 202
                }
                res.send(JSON.stringify(result));
            } else {
                if (agentID!=info.agentID){
                    console.log('info.agentID='+ info.agentID +' => agentID='+ agentID);
                    var result = {
                        "data": {},
                        "message":'您的帐号在另一地点登录，请重新登录。(注：如果这不是您本人操作，请注意帐号安全)',
                        "status": 202
                    }
                    res.send(JSON.stringify(result));
                } else {
                    cache.expire(infoKey,liveTime);
                    cache.expire('ua:'+ agentID,liveTime);
                    next();
                }
            }
        }
    });
}

//取用户键
exports.getUserKyes = function(cb){
    cache.keys('u:*',function(err,keys){
        if (err){
            cb(err,null);
        }else{
            var userDatas = [];
            for (var i=0; i<keys.length; i++){
                var key = keys[i];
                var userID = parseInt(key.replace('u:',''));
                var josn = {
                    "Key": key,
                    "UserID": userID
                };
                userDatas.push(josn);
            }
            cb(null,userDatas)
        }
    });
}

//取用户数据
exports.getUserInfo = function(key,cb){
    cache.get(key,function(err,data){
        if (err){
            cb(err,null);
        }else{
            cb(null,data);
        }
    });
}

//剩余时间
exports.ttl = function(key,cb){
    cache.ttl(key,function(err,data){
        if (err){
            cb(err,0);
        }else{
            cb(null,data);
        }
    });
}