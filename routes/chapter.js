/**
 * Created by Administrator on 2017/1/12.
 */
var express = require('express');
var router = express.Router();
var db=require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {


            res.render('chapter',{name:'王伟'});



});

module.exports = router;