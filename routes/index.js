var crypto = require('crypto');//生成散列值加密密码
var User = require('../models/user');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '高效背单词',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

/*
 * 登录
 * */
router.post('/login', function (req, res, next) {
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检测用户是否存在
    User.get(req.body.email, function (err, user) {
        if (!user) {
            req.flash('error', '密码或用户名错误！');
            return res.redirect('/signup');
        }
        //检测密码是否一致
        if (user.password != password) {
            req.flash('error', '密码错误');
            console.log('no password');
            return res.redirect('/signup');
        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
    });
});

/*
 * 登出
 * */
router.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', '注销成功');
    res.redirect('/');
});

router.post('/signup', function (req, res) {
    console.log(22);
    var email = req.body.email,
        nickname = req.body.nickname,//昵称
        password = req.body.password,//密码
        re_password = req.body.re_password;//重复密码
    if (re_password !== password) {
        req.flash('error', '两次输入密码不一致');
        return res.redirect('/signup');
    }
    /*生成密码的md5*/
    var md5 = crypto.createHash('md5'),
        password = md5.update(password).digest('hex');
    var newUser = new User({
        nickname: nickname,
        email: email,
        password: password
    });

//    检测用户名是否存在
    User.get(newUser.email, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/signup');
        }
        if (user) {
            req.flash('error', '用户已经存在');
            return res.redirect('/signup');
        }

        //如果不存在
        newUser.save(function (err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/singup');//注册失败
                }
                req.session.user = newUser;
                req.flash('success', '注册成功');
                res.redirect('/index');
            }
        );
    });
});

module.exports = router;
