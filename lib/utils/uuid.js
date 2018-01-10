/****************************
 *uuid模块
 *（guid是微软在用的uuid）
 ***************************/

var uuid= require('uuid');

exports.create = function() {
	return uuid.v4().toUpperCase();
};

