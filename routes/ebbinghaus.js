var express = require('express');
var router = express.Router();

/*渲染ebbinghaus页面*/
router.get('/', function (req, res) {
    res.render('ebbinghaus', {
        title: '艾宾浩斯遗忘曲线',
        user: req.session.user
    });
});

module.exports = router;