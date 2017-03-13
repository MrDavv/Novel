var express = require('express');
var router = express.Router();
var novelThief = require('../lib/novelThief');
/* GET home page. */
router.get('/', function(req, res, next) {
    novelAuto.getAllNovel();
    res.send('请运行mongodb,窃取数据');
});

module.exports = router;