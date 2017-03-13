/**
 * Created by Administrator on 2017/1/13.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');

router.get('/', function(req, res, next) {
    db.count('novels',{},function(total){
        console.log(total);
        db.find(
            'novels',
            {},
            {
                fields:
                {
                    name:1,
                    author:1,
                    description:1,
                    imgUrl:1
                },
                sort:
                {
                    lastUpdateTime:-1
                },
                limit:100
            },
            function (err, cols) {
                //.render将数据绑定到ejs文件
                res.render('AllNovels',{data:cols});
            });
    });
});

module.exports = router;