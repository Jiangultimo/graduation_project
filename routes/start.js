var express = require('express');
var Plan = require('../models/plan');
var start = express.Router();

/*获取开始背单词页面*/
start.get('/', function(req, res, next) {
    res.render('start', {
        title: '开始背单词',
        words: req.session.plan,
    });
});

start.post('/', function(req, res, next) {
    var planName = req.body.planName;
    Plan.get(planName, function(err, planName) {
        if (!planName) {
            res.redirect('/');
        }
        req.session.plan = plan;
        req.flash('success', '计划查找成功');
        return res.redirect('/');
    });
});

module.exports = start;
