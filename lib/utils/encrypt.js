/****************
 *加密模块
 ***************/

var crypto = require('crypto');
var cryptoJS = require('crypto-js');

exports.encrypt = function (str) {
 	var md5 = crypto.createHash('md5');
 	return md5.update(str).digest('hex').toUpperCase();
};

// exports.aesEncrypt = function(data,secretKey){
//      var cipher = crypto.createCipher('aes-128-ecb',secretKey);  
//      return cipher.update(data,'utf8','hex') + cipher.final('hex'); 	
// }

 exports.aesEncrypt = function(data,key,iv){//加密
     var _key = cryptoJS.enc.Utf8.parse(key);   
     var _iv  = cryptoJS.enc.Utf8.parse(iv);   
     var _data = cryptoJS.enc.Utf8.parse(data);  
     var encrypted = cryptoJS.AES.encrypt(_data, _key, { iv: _iv,mode:cryptoJS.mode.CBC});
     return encrypted.toString();  
}


// exports.aesDecrypt = function(data, secretKey) {  
//     var cipher = crypto.createDecipher('aes-128-ecb',secretKey);  
//     return cipher.update(data,'hex','utf8') + cipher.final('utf8');  
// }  

exports.aesDecrypt = function(data, key, iv) {//解密
     var _key = cryptoJS.enc.Utf8.parse(key);   
     var _iv  = cryptoJS.enc.Utf8.parse(iv);   
     var decrypt = cryptoJS.AES.decrypt(data, _key, { iv: _iv,mode:cryptoJS.mode.CBC});  
     return cryptoJS.enc.Utf8.stringify(decrypt).toString();  
}  

//AppID加密
exports.cwAppIDEncrypt = function(data){//加密
	if (data==null){
		return 0;
	}
	if (isNaN(parseInt(data))){
		return 0;
	}
	var key = ['3','8','6','7','4','2','5','9','0','1'];
	var str = data.toString();
	var result = '';
	for (var i=0;i<str.length;i++){
		var index = parseInt(str[i]);
		result = result + key[index];	
	}
	var len = result.length;
	var cz = 10 - len;
	if (cz > 0){
		for (var i=0;i<cz;i++){
			result = result + i.toString();
		}
		result = result + cz.toString();
	}
	return parseInt(result);
}

//AppID解密
exports.cwAppIDDecrypt = function(data){//加密
	if (data==null){
		return 0;
	}
	if (isNaN(parseInt(data))){
		return 0;
	}
	var str = data.toString();
	var k = parseInt(str[str.length-1]);
	var cz = str.length - k - 1;
	if (cz>0){
		str = str.substr(0,cz);
		var result = '';
		var key = ['3','8','6','7','4','2','5','9','0','1'];
		for (var i=0;i<str.length;i++){
			result = result + key.indexOf(str[i]).toString();
		}
		return parseInt(result);
	}else{
		return 0;
	}
}

//AppID加密
exports.appIDEncrypt = function(data){//加密
	if (data==null){
		return 0;
	}
	if (isNaN(parseInt(data))){
		return 0;
	}
	var key = ['3','8','6','4','7','2','5','9','0','1'];
	var str = data.toString();
	var result = '';
	for (var i=0;i<str.length;i++){
		var index = parseInt(str[i]);
		result = result + key[index];	
	}
	//result = Math.ceil(Math.random()*parseInt(data)).toString() + result + result.length;
	result = '123' + result + result.length;
	return parseInt(result);
}

//AppID解密
exports.appIDDecrypt = function(data){//加密
	if (data==null){
		return 0;
	}
	if (isNaN(parseInt(data))){
		return 0;
	}
	
	var str = data.toString();
	if (str.length<5){
		return parseInt(data);
	}
	var k = parseInt(str[str.length-1]);
	var result = '';
	var key = ['3','8','6','4','7','2','5','9','0','1'];
	for (var i=str.length-k-1;i<str.length-1;i++){
		result = result + key.indexOf(str[i]).toString();
	}
	if (parseInt(result)<0){
		result = data;
	}
	return parseInt(result);
}