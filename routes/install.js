/**
 * Created by Administrator on 2017/1/9.
 */
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


/* GET home page. */
router.get('/', function(req, res, next) {
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
    var server = new mongodb.Server("127.0.0.1",27017,{});
    var db=new mongodb.Db('novel',server,{})
    db.open(function(error,db){//数据库：mongotest
        if(error) throw error;
        db.collection('admins',{safe:true}, function(err, collection){
            if(err){
                console.log(err);
            }else{
                //增
//                collection.insert({
//                    loginId:'admin2',
//                    loginPass:'345'
//                });
                //删
//                collection.remove({_id:mongodb.ObjectId('58732f7de34f1a25d86d953a')});
                //改
//                collection.update(
//                    {_id:mongodb.ObjectId('58734ee4f7976a39ac6fa262')},
//                    {loginId:'王伟',loginPass:'love me'}
//                );
                //查
                //模糊查询{loginId:{$regex:/.*张.*/i}
                //查询loginId属性值包涵”张“字符的所有对象集合
//                collection.find({loginId:{$regex:/.*[煜,伟].*/i}}).toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                });
                //跳过27条查询后面的两条
//                collection.find().skip(27).limit(2).toArray(function(errfind,cols){
//                    res.send(JSON.stringify(cols));
//                });
                collection.find().toArray(function(errfind,cols){
                    res.send(JSON.stringify(cols));
                });
            }
        });
    });
    //res.send('安装成功');

});

module.exports = router;