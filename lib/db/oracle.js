var dbOracle = require('oracledb');
var config = require('../../config');
var async =  require('async');

var Oracle = function (config) {
	this.config = config;
    dbOracle.maxRows = config.maxRows;
    dbOracle.autoCommit = config.autoCommit;
    dbOracle.extendedMetaData = config.extendedMetaData;
    dbOracle.connectionClass = config.connectionClass;
    dbOracle.fetchAsBuffer = [dbOracle.BLOB];
    //dbOracle.fetchAsString = [dbOracle.BLOB];
};

Oracle.prototype.createPool=function(cb){
    var self=this;
    dbOracle.createPool(
        this.config,
        function(err, pool) {
            if (err){
                console.log("createPool is err:"+ err);
                cb(err);
            } else {
                console.log("createPool is ok");
                self._pool = pool;
                cb(null);
            }
        }
    );
}

/************************
 *执行sql语句查询
 *var dbOracle = require('oracledb');
 var async    = require('async');
 var config = require('../../config');

 ***********************/
Oracle.prototype.query = function(sql, cb) {
    var self=this;
    var _conn = null;
    async.series([
        function(callback){
            if (self._pool==null){
                self.createPool(function(err){
                    if (err){
                        callback(err);
                        return;
                    }
                    callback(null);
                });
            }else{
                callback(null);
            }
        },
        function(callback) {
            self._pool.getConnection( function(err, conn) {
                if (err){
                    //console.log("getConnection is err:"+ err);
                    callback(err);
                } else {
                    _conn = conn;
                    callback(null);
                }
            });
        },
        function(callback) {
            _conn.execute(
                sql,
                function(err,result) {
                    if (err){
                        //console.log("execute is err:"+ err);
                        _conn.release();
                        callback(err);
                    }else{
                        _conn.release();
                        cb(null,result);
                    }
                }
            );
        }
     ],function(err){
        if (err){
            console.log('query is err:'+ err);
            cb(err,null);
        }
    });
 };

/************************
 *执行sql带参数语句查询
 *
 ***********************/
Oracle.prototype.queryParam = function(sql, param, cb) {
    var self=this;
    var _conn = null;
    async.series([
        function(callback){
            if (self._pool==null){
                self.createPool(function(err){
                    if (err){
                        callback(err);
                        return;
                    }
                    callback(null);
                });
            }else{
                callback(null);
            }
        },
        function(callback) {
            self._pool.getConnection( function(err, conn) {
                if (err){
                    //console.log("getConnection is err:"+ err);
                    callback(err);
                } else {
                    _conn = conn;
                    callback(null);
                }
            });
        },
        function(callback) {
            _conn.execute(
                sql,
                param,
                function(err,result) {
                    if (err){
                        //console.log("executeParam is err:"+ err);
                        _conn.release();
                        callback(err);
                    }else{
                        _conn.release();
                        cb(null,result);
                    }
                }
            );
        }
    ],function(err){
        if (err){
            console.log('queryParam is err:'+ err);
            cb(err,null);
        }
    });
};

Oracle.clcApp = new Oracle(config.oracle_clcAppConnStr);

module.exports = Oracle;