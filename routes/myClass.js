/**
 * Created by Administrator on 2017/1/9.
 */
express = require('express');
var router = express.Router();
var db = require('../lib/db');

//var mongodb = require('mongodb');
//var monk = require('monk');

router.get('/', function(req, res, next) {
    db.remove('students',{},function(){});
    db.insert(
        'students',
        [
            {loginId:'wangwei',loginPass:'123456'}
        ],
        function(){
//       res.send('初始化成功');
        }
    );
    db.find('students',{},{},function(err,clos){
        res.send(JSON.stringify(clos));
    });
//    //链接数据库
//    var db=new monk('localhost:27017/novel');
//
//    //获取集合
//    var cols = db.get('admins');
//    //插入数据到集合
//    cols.insert({
//        'loginId':'student',
//        'loginPass':'123456'
//    });
//    res.send('数据库安装成功'+JSON.stringify(cols.find()));
    //增加数据
    //连接数据库
//    var server = new mongodb.Server("127.0.0.1",27017,{});
//    var db=new mongodb.Db('class',server,{})
//    db.open(function(error,db){//数据库：mongotest
//        if(error) throw error;
//        db.collection('students',{safe:true}, function(err, collection){
//            if(err){
//                console.log(err);
//            }else{
                //增

//                collection.find().toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                });
//               db.find('students',{},{},function(err,cols){
//                   db.insert('students',{loginId:'wangwei',loginPass:'666666'},function(){
//                       res.send(JSON.stringify(cols));
//                   });
//               });
//            };
//        });
//    });
});

module.exports = router;