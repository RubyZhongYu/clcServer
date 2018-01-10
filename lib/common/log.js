/**
* 日志模块（负责命令行输出和日志输出）
* @module log
*/
var fs=require('fs');
/********************************************************************************
 函数名：assert
 功能：如果condition为false，则输出消息字符串并抛出AssertionError异常
 输入参数: condition 布尔值
 message 待输出的消息
 返回值：无
 *******************************************************************************/

/**
* 如果condition为false，则输出消息字符串并抛出AssertionError异常
* @method assert 
* @param {Bool} condition 对比表达式 
* @param {String} msg 消息内容
*/
exports.assert = function(condition, msg) {
    console.assert(condition == true, msg);
}

/********************************************************************************
 函数名：log
 功能：输出到命令行
 输入参数: msg 输出字符
 返回值：无
 *******************************************************************************/

/**
* 输出到命令行
* @method log 
* @param {String} msg 消息内容
*/
exports.log = function(msg) {
    console.log(msg);
}
/********************************************************************************
 函数名：error
 功能：报错到命令行
 输入参数: msg 输出字符
 err 错误对象
 返回值：无
 *******************************************************************************/

/**
* 报错到命令行
* @method error 
* @param {String} msg 消息内容
*/
exports.error = function(msg,err) {
    //如果只传入一个参数
    fs.appendFile( './errorlog.txt', '\n'+'['+new Date().format('yyyy-MM-dd hh:mm:ss')+']error:'+msg, function(err){
        if(err){ }else{
            console.log(msg);
        }
    } );
    if(err === undefined)
    {
        console.error(msg);
    } else{
        console.error(msg + ' --> ' + err);
//        fs.readFileSync('data.json',function(err, data){
//            if(err){ }else{
//                console.log(data.length);
//            }
//        });
//        fs.appendFile( '../../errorlog.txt', msg, function(err){
//            if(err){ }else{
//                console.log(data.length);
//            }
//        } );
    }

}
