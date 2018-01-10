/**
 * redis缓存工具
 */
var config = require('../../config');
var redis = require('redis');
var client = redis.createClient(config.redis.port, config.redis.host,{
    auth_pass : config.redis.pass || null
});
if(config.redis.db){
    client.select(config.redis.db);
}

client.on('error',function(err){
   console.error(err)
});

var defCb = function(err){
    if(err){
        console.error(err);
    }
};
exports.client = client;

/**
 * 获取缓存内容
 * @param key
 * @param callback
 */
var get = function get(key, callback) {
    client.get(key, function (err, data) {
        if (err) {
            return callback(err);
        }
        if (!data) {
            return callback();
        }
        data = JSON.parse(data);
        callback(null, data);
    });
};

exports.get = get;

/**
 * 设置缓存内容
 * @param key 缓存键
 * @param value 缓存值
 * @param time 生存周期,单位为秒
 * @param callback
 */
var set = function set(key, value, time, callback) {
    if (typeof time === 'function') {
        callback = time;
        time = null;
    }
    callback = callback || defCb;
    value = JSON.stringify(value);
    if (!time) {
        client.set(key, value, callback);
    } else {
        client.setex(key, time, value, callback);
    }
};

exports.set = set;

/**
 * 删除给定的键
 * @param key
 * @param callback
 */
var del = function del(key, callback) {
    callback = callback || defCb;
    client.del(key, callback);
};

exports.del = del;

/**
 * 将给定键的值增加1,如果值不存在则初始化为0
 * @param key
 * @param callback
 */
var incr = function incr(key, callback) {
    callback = callback || defCb;
    client.incr(key, callback);
};

exports.incr = incr;

/**
 * 将给定键的值减1,如果值不存在则初始化为0
 * @param key
 * @param callback
 */
var decr = function decr(key, callback) {
    callback = callback || defCb;
    client.decr(key, callback);
};

exports.decr = decr;

/**
 * 设置某个键的过期时间,单位秒
 * @param key 键
 * @param times 过期的时间,秒
 * @param callback
 */
var expire = function expire(key, times ,callback) {
    callback = callback || defCb;
    client.expire(key,times,callback);
};

exports.expire = expire;


/**
*取指定所有的keys
*/

var keys = function keys(keyWord,callback){
    client.keys(keyWord,callback);
};

exports.keys = keys;

/**
*取剩余时间(秒)
*/

var ttl = function ttl(key,callback){
    client.ttl(key,callback);
};

exports.ttl = ttl;