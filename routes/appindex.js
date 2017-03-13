/**
 * Created by Administrator on 2017/1/14.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    var page = new Number(req.query.page||1);
    var rows = 12;
    var category = req.query.category||'';
    var searchTxt = req.query.searchTxt||'';
    var reg = new RegExp('.*'+(req.query.searchTxt||'')+'.*');
    var query = {name:reg,category:new RegExp(category)};
    console.log(category);
    db.count('novels',query,function(total){
        console.log(total);
        var isNextPage = page*rows<total;
        db.find(
            'novels',
            query,
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
                limit:rows,
                skip:(page-1)*rows
            },
            function (err, cols) {
                //.render将数据绑定到ejs文件
                res.render('appindex',{str:category,isNextPage:isNextPage,page:page,rows:cols,txt:searchTxt});
            });
    });
});

module.exports = router;
