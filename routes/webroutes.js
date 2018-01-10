/******************************
 *路由逻辑文件
 *
 *****************************/
var xlys = require('../controllers/xlys');
var jxht = require('../controllers/jxht');
var clzp = require('../controllers/clzp');
var rsgl = require('../controllers/rsgl');
var qxgl = require('../controllers/qxgl');
var sql =  require('../controllers/sql');
var paramMid = require('../middlewares/paramMid');
var session = require('../lib/cache/redisSession');

module.exports = function (app) {
    //参数拦截验证，立即返回前台
    app.use('/', paramMid.paramRequired);
	/************************************************************
	 *sql查询模块,
	 * 注：可在前端写SQL，完成任何查询、修改、添增、删除；安全性低，后期程序变动，可能会要更新前端程序
	 *创建人:
	 ***********************************************************/
	//取sql查询结果
	//调用的json: {"Data":{"SQL":"","TreeShow":1,"PK":"","PID":""}}
	//SQL sql语句
	//TreeShow 返回数据是否是树型结构， 可选参数， 1为是，如果不传，以行形式返回
	//PK 主键，当TreeShow=1时使用， 可选参数
	//PID 父ID，当TreeShow=1时使用， 可选参数
	//注：返回树型结构，TreeShow==1且PK!=''且PID!=''; PK,PID必须出现在查询字段中
	//成功返回sql查询结果
	app.post('/sql/query',sql.query);
	//取sql查询结果, 带参数形式
	//调用的json: {"Data":{"SQL":"","Params":"","TreeShow":1,"PK":"","PID":""}}
	//SQL sql语句
	//Params 以传参形式查询，多个用逗号隔开
	//TreeShow 返回数据是否是树型结构， 可选参数， 1为是，如果不传，以行形式返回
	//PK 主键，当TreeShow=1时使用， 可选参数
	//PID 父ID，当TreeShow=1时使用， 可选参数
	//注：返回树型结构，TreeShow==1且PK!=''且PID!=''; PK,PID必须出现在查询字段中
	//成功返回sql查询结果
	app.post('/sql/query/params',sql.queryParams);

	//-----------------------以下为后端SQL做法-------------------------

    /************************************************************
     *检修合同
     *创建人:
     ***********************************************************/
    //取T07_车型表数据
    //调用的json: {"Data":{"T0700":0,"TreeShow":1}}
    //T0700 产品类型ID，可选参数，如果不传，返回所有
	//TreeShow 返回数据是否是树型结构， 可选参数， 1为是，如果不传，以行形式返回
    //成功返回T07列表
    app.post('/jxht/T07/get',jxht.getT07);
    //取T02数据 车辆信息表
    //调用的json: {"Data":{"T0700":0}}
    //T0700 产品类型ID
    //T020 车辆ID，可选参数，如果不传，产品下所有
    //成功返回T02列表
    app.post('/jxht/T02/get',jxht.getT02);
    /************************************************************
     *细录预算
     *创建人:
    ***********************************************************/
    //取T34_检修部门表数据
    //调用的json: {"Data":{"T0700":0}}
    //T0700 产品类型ID
    //成功返回T34列表
    app.post('/xlys/T34/get',xlys.getT34);
    //取T40_检修模板分类表数据
    //调用的json: {"Data":{"T0700":0,"T3400":0,"TreeShow":1}}
    //T0700 产品类型ID
    //T3400 部位ID，可选参数，如果没有，请不要传入
    //TreeShow 返回数据是否是树型结构， 可选参数， 1为是，如果不传，以行形式返回
    //成功返回T40列表
    app.post('/xlys/T40/get',xlys.getT40);
	//取T73_最终检修模板分类表数据
	//调用的json: {"Data":{"T0700":0,"T3400":0,"TreeShow":1}}
	//T0700 产品类型ID
	//T3400 部位ID，可选参数，如果没有，请不要传入
	//TreeShow 返回数据是否是树型结构， 可选参数， 1为是，如果不传，以行形式返回
	//成功返回T73列表
	app.post('/xlys/T73/get',xlys.getT73);
    //取T39_检修明细模板表（含有子表所有信息）数据
    //调用的json: {"Data":{"T4000":0,"T3900":0}}
    //T4000 检修模板分类ID
    //T3900 检修明细表ID, 可选参数
    //成功返回T39列表
    app.post('/xlys/T39/get',xlys.getT39);
    //取TFJ01_检修明细表主表数据
	//调用的json: {"Data":{"T0200":0,"TFJ0100":0}}
	//T0200 车辆ID
	//TFJ0100 检修明细表主表ID, 可选参数
	//成功返回TFJ01列表
	app.post('/xlys/TFJ01/get',xlys.getTFJ01);
	//添加TFJ01_检修明细表主表数据
	//调用的json: {"Data":{"T0200":0,"T3400":0,"TRS0100":0,"TFJ0109":0,"TFJ0113":"","TFJ0114":0,"TFJ0115":0}}
	//T0200 车辆ID
	//T3400 检修部位ID
	//TRS0100 操作人员ID S0105
	//TFJ0109 检查费用 	通过T40表获取 具体查看ERP导入模板代码：select max(T4006)as T4006, sum(Nvl(T4007,0)) as T4007, sum(Nvl(T4008,0)) as T4008, sum(Nvl(T4009,0)) as T4009 from T40 where 1 = 1
	//TFJ0113 技术文件ID集 通过T40表获取 具体查看ERP导入模板代码：select max(T4006)as T4006, sum(Nvl(T4007,0)) as T4007, sum(Nvl(T4008,0)) as T4008, sum(Nvl(T4009,0)) as T4009 from T40 where 1 = 1
	//TFJ0114 委外修费用 通过T40表获取 具体查看ERP导入模板代码：select max(T4006)as T4006, sum(Nvl(T4007,0)) as T4007, sum(Nvl(T4008,0)) as T4008, sum(Nvl(T4009,0)) as T4009 from T40 where 1 = 1
	//TFJ0115 另计价费用 通过T40表获取 具体查看ERP导入模板代码：select max(T4006)as T4006, sum(Nvl(T4007,0)) as T4007, sum(Nvl(T4008,0)) as T4008, sum(Nvl(T4009,0)) as T4009 from T40 where 1 = 1
	//成功返回ErpID:ERP中的ID，IsGXCC:改修程车（可重复添加模板）[1 是 0 是]格式如下：
	// {"data":{"ErpID":0,"IsGXCC":0},"message": "添加成功!","status": 200}
	app.post('/xlys/TFJ01/insert',xlys.insertTFJ01);
	//删除TFJ01_检修明细表主表数据, 所有子表同时会删除
	//调用的json: {"Data":{"TFJ0100":0}}
	//TFJ0100 主键
	//返回提示
	app.post('/xlys/TFJ01/delete',xlys.deleteTFJ01);
	//添加TFJ02表 只注：在接车单模块使用
	//调用的json: {"Data":{"TFJ0201":0,..... }}
	// 	TFJ0201              NUMBER(10)                      not null, 明细项目(物资)ID(T3300)
	// 	TFJ0203              CHAR(256)                       not null, 说明
	// 	TFJ0204              NUMBER(10)                      not null, 分解检修主表ID(TFJ0100)
	// 	TFJ0205              NUMBER(10)                      not null, 模板明细ID(T3900)
	// 	TFJ0206              CHAR(50),								   配件(物资)名称
	// 	TFJ0208              NUMBER(5)                       not null, 顺序号
	// 	TFJ0209              CHAR(20),                                 工作号
	// 	TFJ0211              NUMBER(5),                                检修表位
	// 	TFJ0212              NUMBER(10)                      not null, 工厂生产工序ID(TSZ2300)
	// 	TFJ0213              NUMBER(5,2),                              工厂工时定额
	// 	TFJ0214              NUMBER(10)                      not null, 领料单位(车间)ID(TSZ2900)
	// 	TFJ0216              NUMBER(15,4),                             更换数量
	// 	TFJ0217              NUMBER(15,4),                             检修数量
	// 	TFJ0218              NUMBER(15,4),                             新制数量
	// 	TFJ0220              CHAR(20)                        not null, 页号
	// 	TFJ0227              NUMBER(15,4),                             应有数量
	// 	TFJ0228              CHAR(40),                                 分解材料物资规格
	// 	TFJ0232              NUMBER(2)                       not null, 新增项目(0是 1否)
	// 	TFJ0233              VARCHAR2(20),                             工厂工艺路线简称
	// 	TFJ0234              FLOAT                          default 0, 配件面积
	// 	TFJ0235              FLOAT                          default 0, 考漆或喷塑(1烤漆 2喷塑 3油漆)
	// 	TFJ0236              NUMBER(1)                      default 0, 选装标志(0否 1是)
	// 	TFJ0237              FLOAT                          default 0, 重量
	// 	TFJ0238              FLOAT                          default 0, 比重
	// 	TFJ0239              NUMBER(1)                      default 0, 净材标志(0否 1硬木 2软木 3华南硬木)
	// 	TFJ0240              VARCHAR2(10),                             检修计量单位
	// 	TFJ0241              FLOAT                          default 0, 配件体积
	// 	TFJ0243              FLOAT,                                    配件长度
	// 	TFJ0244              NUMBER(10),                               供货厂商ID
	// 	TFJ0249              FLOAT,                                    喷塑烤漆面积
	// 	TFJ0250              NUMBER(1),                                物料属性(TJS0546)
	// 	TFJ0251              NUMBER(15,4),                             拆损数
	// 	TFJ0253              VARCHAR2(6),                              送件标志
	// 	TFJ0254              NUMBER(10),                               实际领料单位ID
	// 	TFJ0255              VARCHAR2(20),                             招标分类(TFJ4702)
	// 	TFJ0260              NUMBER(1)                      default 0, 接车标志(0 否 1 是)
	// 	TFJ0263              NUMBER(15,4)                   default 0, 缺少数量
	// 	TFJ0264              NUMBER(1)                      default 0, 要求加装(0 无 1 否 2 是)
	// 	TFJ0265              NUMBER(1),                                是否收费(0 无 1 否 2 是)
	// 	TFJ0266              NUMBER(1)                      default 0, 检修分类(0 正常检修 1 合同要求 2 段改保修)
	// 	TFJ0269              NUMBER(1)                      default 0, 检修项目选中
	// 	TFJ0270              NUMBER(1)                      default 0, 数据状态
	// 	TFJ0276              VARCHAR2(255),                            入厂状态(机车)
	// 	TFJ0277              VARCHAR2(255),                            会议决议(机车)
	// 	TFJ0278              VARCHAR2(254),                            车间补充备注
	//成功返回ErpID:ERP中的ID格式如下：
	// {"data":{"ErpID":0},"message": "添加成功!","status": 200}
	app.post('/xlys/TFJ02/insert',xlys.insertTFJ02);
	//添加接车单
	//调用的json: {"Data":{"TFJ0200":0,"TFJ0201":0,"TFJ0206":"","TFJ0227":0,"TFJ0263":0,"TFJ0264":0,"TFJ0265":0,"TFJ0203":""}}
	//TFJ0200 表ID
	//TFJ0201 物资ID T3300
	//TFJ0206 配件名称
	//TFJ0227 应有数量
	//TFJ0263 缺少数量
	//TFJ0264 要求加装
	//TFJ0265 是否收费
	//TFJ0203 说明
	//成功返回ErpID:ERP中的ID格式如下：
	// {"data":{"ErpID":0},"message": "添加成功!","status": 200}
	app.post('/xlys/jcd/update',xlys.updateJcd);
	//删除接车明细，所有子表同时会删除
	//调用的json: {"Data":{"TFJ0200":0}}
	//TFJ0200 主键
	//返回提示
	app.post('/xlys/TFJ02/delete',xlys.deleteTFJ02);
	//取TFJ02_检修明细表（含有子表所有信息）数据
	//调用的json: {"Data":{"TFJ0100":0,"TFJ0200":0}}
	//TFJ0100 主表ID
	//TFJ0200 检修明细表ID, 可选参数
	//成功返回TFJ02列表
	app.post('/xlys/TFJ02/get',xlys.getTFJ02);
	//添加检修项目状态说明
	//调用的json: {"Data":{"T7501":"","T7502":0,"T7503":0}}
	//成功返回ErpID:ERP中的ID格式如下：
	// {"data":{"ErpID":0},"message": "添加成功!","status": 200}
	app.post('/xlys/T75/insert',xlys.insertT75);
	//更新检修项目状态说明
	//调用的json: {"Data":{"T7500":0,"T7501":"","T7502":0}}
	app.post('/xlys/T75/update',xlys.updateT75);
	//删除检修项目状态说明
	//调用的json: {"Data":{"T7500":0}}
	app.post('/xlys/T75/delete',xlys.deleteT75);
	//添加检修明细表
	//调用的json: {"Data":{"TFJ0201":0,..... }}
	// 	TFJ0201              NUMBER(10)                      not null, 明细项目(物资)ID(T3300)
	// 	TFJ0203              CHAR(256)                       not null, 说明
	// 	TFJ0204              NUMBER(10)                      not null, 分解检修主表ID(TFJ0100)
	// 	TFJ0205              NUMBER(10)                      not null, 模板明细ID(T3900)
	// 	TFJ0206              CHAR(50),								   配件(物资)名称
	// 	TFJ0208              NUMBER(5)                       not null, 顺序号
	// 	TFJ0209              CHAR(20),                                 工作号
	// 	TFJ0211              NUMBER(5),                                检修表位
	// 	TFJ0212              NUMBER(10)                      not null, 工厂生产工序ID(TSZ2300)
	// 	TFJ0213              NUMBER(5,2),                              工厂工时定额
	// 	TFJ0214              NUMBER(10)                      not null, 领料单位(车间)ID(TSZ2900)
	// 	TFJ0216              NUMBER(15,4),                             更换数量
	// 	TFJ0217              NUMBER(15,4),                             检修数量
	// 	TFJ0218              NUMBER(15,4),                             新制数量
	// 	TFJ0220              CHAR(20)                        not null, 页号
	// 	TFJ0227              NUMBER(15,4),                             应有数量
	// 	TFJ0228              CHAR(40),                                 分解材料物资规格
	// 	TFJ0232              NUMBER(2)                       not null, 新增项目(0是 1否)
	// 	TFJ0233              VARCHAR2(20),                             工厂工艺路线简称
	// 	TFJ0234              FLOAT                          default 0, 配件面积
	// 	TFJ0235              FLOAT                          default 0, 考漆或喷塑(1烤漆 2喷塑 3油漆)
	// 	TFJ0236              NUMBER(1)                      default 0, 选装标志(0否 1是)
	// 	TFJ0237              FLOAT                          default 0, 重量
	// 	TFJ0238              FLOAT                          default 0, 比重
	// 	TFJ0239              NUMBER(1)                      default 0, 净材标志(0否 1硬木 2软木 3华南硬木)
	// 	TFJ0240              VARCHAR2(10),                             检修计量单位
	// 	TFJ0241              FLOAT                          default 0, 配件体积
	// 	TFJ0243              FLOAT,                                    配件长度
	// 	TFJ0244              NUMBER(10),                               供货厂商ID
	// 	TFJ0249              FLOAT,                                    喷塑烤漆面积
	// 	TFJ0250              NUMBER(1),                                物料属性(TJS0546)
	// 	TFJ0251              NUMBER(15,4),                             拆损数
	// 	TFJ0253              VARCHAR2(6),                              送件标志
	// 	TFJ0254              NUMBER(10),                               实际领料单位ID
	// 	TFJ0255              VARCHAR2(20),                             招标分类(TFJ4702)
	// 	TFJ0260              NUMBER(1)                      default 0, 接车标志(0 否 1 是)
	// 	TFJ0263              NUMBER(15,4)                   default 0, 缺少数量
	// 	TFJ0264              NUMBER(1)                      default 0, 要求加装(0 无 1 否 2 是)
	// 	TFJ0265              NUMBER(1),                                是否收费(0 无 1 否 2 是)
	// 	TFJ0266              NUMBER(1)                      default 0, 检修分类(0 正常检修 1 合同要求 2 段改保修)
	// 	TFJ0269              NUMBER(1)                      default 0, 检修项目选中
	// 	TFJ0270              NUMBER(1)                      default 0, 数据状态
	// 	TFJ0276              VARCHAR2(255),                            入厂状态(机车)
	// 	TFJ0277              VARCHAR2(255),                            会议决议(机车)
	// 	TFJ0278              VARCHAR2(254),                            车间补充备注
	//成功返回ErpID:ERP中的ID格式如下：
	// {"data":{"ErpID":0},"message": "添加成功!","status": 200}
	app.post('/xlys/jxmx/insert',xlys.insertJxmx);
	//更新检修明细表
	//调用的 开发中
	app.post('/xlys/jxmx/update',xlys.updateJxmx);
	//添加检修明细表工厂工艺路线
	//调用的json: {"Data":{"TCJ0500":0,"TCJ0501":0,"TCJ0502":0,"TCJ0503":0,"TCJ0504":0,"TCJ0505":0,"TCJ0506":"","TCJ0507":0}}
	//成功返回ErpID:ERP中的ID格式如下：
	// {"data":{"ErpID":0},"message": "添加成功!","status": 200}
	app.post('/xlys/TCJ05/insert',xlys.insertTCJ05);
	//更新检修明细表工厂工艺路线
	//调用的json: {"Data":{"TCJ0500":0,"TCJ0502":0,"TCJ0503":0,"TCJ0504":0,"TCJ0505":0,"TCJ0506":"","TCJ0507":0}}
	app.post('/xlys/TCJ05/update',xlys.updateTCJ05);
	//删除检修明细表工厂工艺路线
	//调用的json: {"Data":{"TCJ0500":0}}
	app.post('/xlys/TCJ05/delete',xlys.deleteTCJ05);
	//添加检修明细表车间工艺路线
	//调用的json: {"Data":{"TCJ0600":0,"TCJ0601":0,"TCJ0602":0,"TCJ0603":0,"TCJ0604":0,"TCJ0605":0,"TCJ0606":"","TCJ0607":0,
	// "TCJ0608":0,"TCJ0609":"","TCJ0610":0,"TCJ0611":0,"TCJ0612":0,"TCJ0613":"","TCJ0614":0}}
	//成功返回ErpID:ERP中的ID格式如下：
	// {"data":{"ErpID":0},"message": "添加成功!","status": 200}
	app.post('/xlys/TCJ06/insert',xlys.insertTCJ06);
	//更新检修明细表车间工艺路线
	//调用的json: {"Data":{"TCJ0600":0,TCJ0602":0,"TCJ0603":0,"TCJ0604":0,"TCJ0605":0,"TCJ0606":"","TCJ0607":0,
	// "TCJ0608":0,"TCJ0609":"","TCJ0610":0,"TCJ0611":0,"TCJ0612":0,"TCJ0613":"","TCJ0614":0}}
	app.post('/xlys/TCJ06/update',xlys.updateTCJ06);
	//删除检修明细表车间工艺路线
	//调用的json: {"Data":{"TCJ0600":0}}
	app.post('/xlys/TCJ06/delete',xlys.deleteTCJ06);
	/************************************************************
	 *车辆照片
	 *创建人:
	 ***********************************************************/
	//添加车辆照片(ERP专用)
	//调用的json: {"Data":{"TFJ5100":0,"TFJ5103":"","TFJ5106":0,"TFJ5101":0,"TFJ5102":0}}
	//TFJ5100 照片名称
	//TFJ5106 + TFJ5101 + TFJ5102 路径
	//TFJ5103 文件内容 base64
	//返回提示
	app.post('/clzp/TFJ51/add',clzp.addClzp);
	//删除车辆照片(ERP专用)
	//调用的json: {"Data":{"TFJ5100":0,"TFJ5106":0,"TFJ5101":0,"TFJ5102":0}}
	//TFJ5100 照片名称
	//TFJ5106 + TFJ5101 + TFJ5102 路径
	//返回提示
	app.post('/clzp/TFJ51/del',clzp.delClzp);
	//添加车辆外观照片模板(ERP专用)
	//调用的json: {"Data":{"TFJ2900":0,"TFJ2901":0,"Photo":"","TFJ2905":0}}
	//TFJ2900 照片名称
	//TFJ2901 + TFJ2905 路径
	//Photo 文件内容 base64
	//返回提示
	app.post('/clzp/TFJ29/add',clzp.addTFJ29);
	//删除车辆外观照片模板(ERP专用)
	//调用的json: {"Data":{"TFJ2900":0,"TFJ2901":0,"TFJ2905":0}}
	//TFJ2900 照片名称
	//TFJ2901 + TFJ2905 路径
	//返回提示
	app.post('/clzp/TFJ29/del',clzp.delTFJ29);
	//取车辆外观照片模板 注：不包括图片
	//调用的json: {"Data":{"UpdateTime":"2017-12-12 23:59:59"}}
	//UpdateTime 可选参数， 只取操作时间大于此时间的记录， 减少同步数据
	//返回TFJ29列表
	app.post('/clzp/TFJ29/get',clzp.getTFJ29);
	//取车辆外观照片模板
	//调用的json: {"Data":{"TFJ2900":0,"TFJ2901":0,"TFJ2905":0}}
	//TFJ2900 照片名称
	//TFJ2901 + TFJ2905 路径
	//返回图片内容base64
	app.post('/clzp/TFJ29/get/photo/base64',clzp.getTFJ29PhotoBase64);
	//取车辆外观照片 注：不包括图片
	//调用的json: {"Data":{"T0200",0,"UpdateTime":"2017-12-12 23:59:59"}}
	//T0200 车辆ID
	//UpdateTime 可选参数， 只取操作时间大于此时间的记录， 减少同步数据
	//返回TFJ30列表
	app.post('/clzp/TFJ30/get',clzp.getTFJ30);
	//取车辆外观照片
	//调用的json: {"Data":{"TFJ3000":0,"TFJ3001":0,"TFJ3002":0,"TFJ3003":0}}
	//TFJ3000 照片名称
	//TFJ3001 + TFJ3002 + TFJ3003 路径
	//返回图片内容base64
	app.post('/clzp/TFJ30/get/photo/base64',clzp.getTFJ30PhotoBase64);
	//添加车辆外观照片
	//调用的json: {"Data":{"Photo":"","PhotoName":"","PhotoMemo":"","T0200":0,"T3400":0,"TSZ2900":0}}
	//Photo 文件内容 base64
	//PhotoName 照片名称
	//PhotoMemo 可选参数 照片备注
	//T0200 车辆ID
	//T3400 检修部位ID
	//TSZ2900 车间ID 可选参数 如果=0可不传，默认组装车间
	//成功返回ErpID:ERP中的ID格式如下：
	// {"data":{"ErpID":0},"message": "添加成功!","status": 200}
	app.post('/clzp/TFJ30/insert',clzp.insertTFJ30);
	//更新车辆外观照片
	//调用的json: {"Data":{"TFJ3000":0,"Photo":"","TFJ3004":"","TFJ3006":""}}
	//TFJ3000 表主键
	//Photo 文件内容 base64
	//TFJ3004 照片名称
	//TFJ3006 可选参数 照片备注
	//返回提示
	app.post('/clzp/TFJ30/update',clzp.updateTFJ30);
	//删除车辆外观照片
	//调用的json: {"Data":{"TFJ3000":0}}
	//TFJ3000 表主键
	//返回提示
	app.post('/clzp/TFJ30/delete',clzp.deleteTFJ30);
	//取车辆照片 注：不包括图片
	//调用的json: {"Data":{"T0200",0,"UpdateTime":"2017-12-12 23:59:59"}}
	//T0200 车辆ID
	//UpdateTime 可选参数， 只取操作时间大于此时间的记录， 减少同步数据
	//返回TFJ51列表
	app.post('/app/clzp/TFJ51/get',clzp.getTFJ51);
	//添加车辆照片
	//调用的json: {"Data":{"Photo":"","PhotoName":"","PhotoMemo":"","T0200":0,"T3400":0,"TSZ2900":0}}
	//Photo 文件内容 base64
	//PhotoName 照片名称
	//PhotoMemo 可选参数 照片备注
	//T0200 车辆ID
	//T3400 检修部位ID
	//TSZ2900 车间ID 可选参数 如果=0可不传，默认组装车间
	//成功返回ErpID:ERP中的ID格式如下：
	// {"data":{"ErpID":0},"message": "添加成功!","status": 200}
	app.post('/clzp/TFJ51/insert',clzp.insertTFJ51);
	//更新车辆照片
	//调用的json: {"Data":{"TFJ5100":0,"Photo":"","TFJ5104":"","TFJ5105":""}}
	//TFJ5100 表主键
	//Photo 文件内容 base64
	//TFJ5104 照片名称
	//TFJ5105 可选参数 照片备注
	//返回提示
	app.post('/clzp/TFJ51/update',clzp.updateTFJ51);
	//删除车辆外观照片
	//调用的json: {"Data":{"TFJ5100":0}}
	//TFJ5100 表主键
	//返回提示
	app.post('/clzp/TFJ51/delete',clzp.deleteTFJ51);
	//取车辆外观照片
	//调用的json: {"Data":{"TFJ5100":0,"TFJ5106":0,"TFJ5101":0,"TFJ5102":0}}
	//TFJ5100 照片名称
	//TFJ5106 + TFJ5101 + TFJ5102 路径
	//返回图片内容base64
	app.post('/clzp/TFJ51/get/photo/base64',clzp.getTFJ51PhotoBase64);
	/************************************************************
	 *人事管理
	 *创建人:
	 ***********************************************************/
	//取T45_车型对应车间关系表
	//返回所有的数据
	app.get('/rsgl/T45/get',rsgl.getT45);
	//取TSZ29_单位信息
	//调用的json: {"Data":{"T0700":0,"TSZ2900",0,"TreeShow":1}}
	//T0700 产品类型ID, 可选参数，如果不传，返回所有
	//TSZ2900 单位，可选参数，如果不传，T0700 规则下所有
	//TreeShow 返回数据是否是树型结构， 可选参数， 1为是，如果不传，以行形式返回
	//返回T45列表
	app.post('/rsgl/TSZ29/get',rsgl.getTSZ29);
	//取TRS01_人员信息
	//调用的json: {"Data":{"TSZ2900":0,"TRS0100":0}}
	//TSZ2900 单位ID
	//TRS0100 人员ID，可选参数，如果不传，单位下所有
	//返回TRS01列表
	app.post('/rsgl/TRS01/get',rsgl.getTRS01);
	/************************************************************
	 *权限管理
	 *创建人:
	 ***********************************************************/
	//取S01_用户表
	//返回所有的数据
	app.get('/qxgl/S01/get',qxgl.getS01);
};