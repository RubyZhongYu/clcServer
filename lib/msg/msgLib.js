/**
 * Created by BlueWork on 2016-07-27.
 */

'use strict';

var TopClient = require('./topClient').TopClient;


var client = new TopClient({
    'appkey' : '23520056' ,
    'appsecret' : 'de028011112fff0766b0a5bbd0302da7',
    'REST_URL' : 'http://gw.api.taobao.com/router/rest'
});

var FindPwdTemplete = '';//参数${number}

//注册
exports.sendRegister = function(phoneNum,code,callback){
    //生成配置
    var config = {
        'extend': '',
        'sms_type': 'normal',
        'sms_free_sign_name': '臻题库',
        'sms_param': "{no:'"+code+"',mm:'60'}",
        'rec_num': phoneNum,
        'sms_template_code': "SMS_25460221"
    };
    console.log('手机号:'+ phoneNum +'请求发送注册验证码:'+ code);
    //发送
    client.execute('alibaba.aliqin.fc.sms.num.send', config, function (err, response) {
        if(err){
            var errorObj = JSON.parse(err.data).error_response;
            var errMessage ='发送注册短信失败 --> phoneNum:'+phoneNum+',sub_msg:'+errorObj.sub_msg+',code:'+errorObj.code+",sub_code:"+errorObj.sub_code;
            console.log(errMessage);
            callback(err, 'err');
        } else{
            console.log('发送注册短信成功 --> phoneNum:'+phoneNum+' code:'+code);
            callback(null, 'ok');
        }
    })
}
//找回密码
exports.sendRestPassWord = function(phoneNum,code,callback){
    console.log('手机号:'+ phoneNum +'请求发送重置密码验证码:'+ code);    
    //生成配置
    var config = {
        'extend': '',
        'sms_type': 'normal',
        'sms_free_sign_name': '臻题库',
        'sms_param': "{no:'"+code+"',mm:'60'}",
        'rec_num': phoneNum,
        'sms_template_code': "SMS_25510333"
    };
    //发送
    client.execute('alibaba.aliqin.fc.sms.num.send', config, function (err, response) {
        if(err){
            var errorObj = JSON.parse(err.data).error_response;
            var errMessage ='发送重置密码短信失败 --> phoneNum:'+phoneNum+',sub_msg:'+errorObj.sub_msg+',code:'+errorObj.code+",sub_code:"+errorObj.sub_code;
            console.log(errMessage);
            callback(err, 'err');
        } else{
            console.log('发送重置密码短信成功 --> phoneNum:'+phoneNum+' code:'+code);
            callback(null, 'ok');
        }
    })
}