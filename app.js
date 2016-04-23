var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

var index = require('./routes/index');//主页
var signup = require('./routes/signup');//注册
var ebbinghaus = require('./routes/ebbinghaus');//艾宾浩斯遗忘曲线

var setting = require('./setting');
var flash = require('connect-flash');
var users = require('./routes/users');

var app = express();
var swig = require('swig');

/*
 * 启动session服务
 * */
app.use(session({
    secret: setting.cookieSecret,
    ket: setting.db,//设置cookie name
    cookie: {maxAge: 1000 },//设置过期时间为一个月
    store: new MongoStore({
        url: 'mongodb://localhost/words'
    })
}));

// view engine setup,use swig
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);//使用swig模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/index', index);
app.use('/login', index);
app.use('/logout',index);
app.use('/signup', signup);
app.use('/ebbinghaus',ebbinghaus);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
