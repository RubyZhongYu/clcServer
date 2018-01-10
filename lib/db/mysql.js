var dbMysql = require('mysql');
var config = require('../../config');

var Mysql = function (config) {
	this.config = config;
	this._pool = dbMysql.createPool(this.config);
};

/************************
 *执行单条sql语句查询
 *
 ***********************/
Mysql.prototype.query = function(sql, callback) {
	this._pool.getConnection(function (poolErr, connection){
		if(poolErr){
			console.log('Mysql.query:' + sql, poolErr);
			return;
		}

		var _callback = callback || function (connErr, result, fields){
			if(connErr){
				console.log('Mysql.query: ' + sql, connErr);
			}
		};
		var _releaseCallback = function (connErr, result, fields){
            if(connErr){
                console.log('Mysql.query: ' + sql, connErr);
            }
			connection.release();
			_callback(connErr, result, fields);
			
		};
		//console.log('come into my query function...');
		connection.query(sql, _releaseCallback);
	});
};

/************************
 *执行单条sql带参数语句查询
 *
 ***********************/
Mysql.prototype.queryParam = function(sql, param, callback) {
	this._pool.getConnection(function (poolErr, connection){
		if(poolErr){
			console.log('Mysql.queryParam:' + sql, poolErr);
			return;
		}

		var _callback = callback || function (connErr, result, fields){
			if(connErr){
				console.log('Mysql.queryParam: ' + sql, connErr);
			}
		};
		var _releaseCallback = function (connErr, result, fields){
            if(connErr){
                console.log('Mysql.queryParam: ' + sql, connErr);
            }
			connection.release();
			_callback(connErr, result, fields);

		};

		//console.log('come into my queryParam function...');
		connection.query(sql, param, _releaseCallback);
	});
};


Mysql.default = new Mysql({});

module.exports = Mysql;