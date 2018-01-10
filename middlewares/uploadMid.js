/*****************
 * 上传模块中间件
 ****************/
var multer = require('multer');
var storage = multer.diskStorage({//配置存储路径，以及存储的文件名
	destination: function (req, file, cb) {
        cb(null, './uploads')
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
});

//上传的中间件处理
exports.uploadCtl = multer({storage: storage}).single('file');//单个文件，文本域name为file