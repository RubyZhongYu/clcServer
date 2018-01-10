'use strict';
/***********************
 *启动app
 *测试
 **********************/
//process.env.DEBUG='*'

global.htSession = new Object();
global.htRegCodeList = new Object();
global.htRegMachineList = new Object();
global.htRestPassWordCodeList = new Object();
global.htRestPassWordMachineList = new Object();

var config       = require('./config');

var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cors         = require('cors');
var cluster = require('cluster');
var moment = require('moment');
var webroutes    = require('./routes/webroutes');

var app          = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

console.oldlog = console.log;
console.log = function(){
    process.stdout.write('<'+ moment().format('YYYY-MM-DD HH:mm:ss') +'> ');
    console.oldlog.apply(console, arguments);
}

//跨域
app.use(cors());

app.use(function(req, res, next) {
    if (config.debug){
        console.log('*****%s %s %s', req.method, req.url, req.ip);
    }
    next();
});


//路由
webroutes(app);

//错误发送邮件
var sendEmailAndExit = function (err){
    var message = ' 进程'+(cluster.worker ?  cluster.worker.id : 'master')+'错误:'+err;
    var transporter = require('nodemailer').createTransport({
        host: config.email.host, //'smtp.qq.com',
        auth: {
            user: config.email.auth.user,
            pass: config.email.auth.pass
        }
    });
    transporter.sendMail({
        from: config.email.auth.user,
        to: '@qq.com',
        subject: config.port + '程序异常 ' + moment().format('YYYY-MM-DD HH:mm:ss'),
        html: '<b>' + (message).replace(/\n/g,'<br>').replace(/  /g, ' &nbsp;') + ' </b>'
    },function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        //process.exit();
    });
    console.log(err);
    transporter.close();
}

//程序异常不退出
process.on('uncaughtException', function (err) {
    // sendEmailAndExit(err.stack || err);
    console.log(err);
});

global.redisSession = require('./lib/cache/redisSession');

//
app.use(function (err, req, res, next) {
    console.log(req.url,'\n',err.stack || err);
    res.send({ "data": {}, "msg":'错误, '+ err, "status": 300 });
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404).send({ "data": {}, "msg":'无效接口地址', "status": 300 });
});

//listen port
app.listen(config.port, function(){
    console.log('CloudService listening on port %d', config.port);
    console.log('You can debug it with http://' + config.hostname + ':' + config.port);
});

module.exports = app;