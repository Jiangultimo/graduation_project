var express = require('express');
var User = require('../models/user');
var router = express.Router();

/*
 * 注册
 * */
router.get('/', function (req, res) {
    res.render('signup', {
        title: '加入高效背单词'
    });
});

module.exports = router;