/**
 * Created by Administrator on 2017/1/12.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
    var id;
    try{
        id = new mongodb.ObjectId(req.query.id||'');
        db.find(
            'novels',
            {_id:id},
            {},
            function(err,cols){
                if(cols<=0){
                    res.send('小说不存在');
                }else{
                    res.render('appviewnove',{data:cols[0]});
                }
            }
        );
    }catch(ex){
        res.send('非法参数');
        id = 0;
    }



});

module.exports = router;/**
 * Created by Administrator on 2017/1/14.
 */
