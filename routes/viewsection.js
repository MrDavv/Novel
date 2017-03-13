/**
 * Created by Administrator on 2017/1/13.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');
var mongodb = require('mongodb');
var novelThief = require('../lib/novelThief');

/* GET home page. */
router.get('/', function(req, res, next) {
    try{
        var id = new mongodb.ObjectId(req.query.id||'');
        var index = parseInt(req.query.index||0);
        db.find(
            'novels',
            {_id:id},
            {},
            function(err,cols){
                if(cols<=0){
                    res.send('小说不存在');
                }else{
                    //还需查询章节具体内容
                    //小说内容对象如下
                    //{_id:1,novelid:'abcdefg',index:0,content:''}
                    var novel = cols[0];

                    db.find('sections',{novelid:req.query.id,index:index},{},function(err,cols){
                        if(cols.length<=0){
                            var sourceUrl=novel.sections[index].sourceUrl;
                            novelThief.getSection(sourceUrl,function(content){
                                res.render('viewsection',{novel:novel,index:index,content:content});
                                db.insert('sections',{novelid:req.query.id,index:index,content:content});
                            });

                        }else{
                            res.render('viewsection',{novel:novel,index:index,content:cols[0].content});
                        }
                    });

                }
            }
        );
    }catch(ex){
        res.send('非法参数');
    }

});

module.exports = router;