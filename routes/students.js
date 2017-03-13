/**
 * Created by Administrator on 2017/1/10.
 */
var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* GET home page. */
router.post('/', function(req, res, next) {
    switch(req.query.ac){
        case 'testLogin':{
            db.find(
                'students',
                {//req.body接收前端post过来的数据
                    loginId:req.body.username,
                    loginPass:req.body.password
                },
                {},
                function(err,cols) {
                    console.log(cols);
                    if(cols.length>0){
                        res.json({error:false,msg:'登陆成功'});
                    }else{
                        res.json({error:true,msg:'用户名密码错误'});
                    }
                }
            );
        }
            break;
        default:{
            res.json({error:true,msg:'未知请求'});
        }
            break;
    }
});
router.get('/', function(req, res, next) {
    switch(req.query.ac){
        default:{
            res.json({error:true,msg:'未知请求'});
        }
            break;
    }
});

module.exports = router;