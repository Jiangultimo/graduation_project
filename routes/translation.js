var crypto = require('crypto');
var express = require('express');
var translation = express.Router();


translation.get('/', function (req, res, next) {
    res.render('translation', {
        title: '翻译',
        user: req.session.user,
        result:req.session.result,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
});

translation.post('/', function (req, res, next) {
    var text = req.body.queryText,//获取翻译文本
        form = 'en',//翻译源语言
        to = 'zh',//译文语言
        appid = 20160317000015814,
        salt = new Date().getTime(),
        key = 'dD3wFDP9y4DV3Ww4Qrjd';
    var _sign = appid+text+salt+key;//拼接签名

    var md5 = crypto.createHash('md5');
    var sign = md5.update(_sign).digest('hex');//对签名做md5加密

    /*
    * 使用ajax请求获取翻译结果
    * */
    ajax({
        url:'http://api.fanyi.baidu.com/api/trans/vip/translate',
        method:'get',
        dataType:'json',
        data:{q:text,form:form,to:to,appid:appid,salt:salt,sign:sign},
        success:function(data){
            cosole.log(data);
            //将返回的数据放入session中
            req.session.result = JSON.parse(data);
            //重新加载页面
            res.redirect('/');
        },
        fail:function( err ){
            console.log(err);
        }
    })
});


/*
* 封装ajax方法
* */
function ajax( options){
    options = options || {};
    options.type = ( options.type || 'GET' ).toUpperCase();
    options.dataType = options.dataType || 'json';
    var params = formatParams(options.data);

    if( window.XMLHttpRequest ){
        var hrx = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function(){
        if( xhr.readyState == 4 ){
            var status = xhr.status;
            if( status >= 200 && status <300 ){
                options.success && options.success(xhr.responseText,xhr.responseXML);
            }else{
                options.fail && opstions.fail(status);
            }
        }
    }

    if( options.type == 'GET' ){
        xhr.open('GET',options.url+'?'+params,true);
        xhr.send(null);
    }else if( options.type == 'POST' ){
        xhr.open('POST',options.url,true);
        xhr.setRequestHeader('Content-type','applicatio/x-www-form-urlencoded');
        xhr.send(params);
    }
}

function formatParams(data){
    var arr = [];
    for( var name in data ){
        arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));
    }
    arr.push(("v="+Math.random()).replace('.',','));
    return arr.join('&');
}


module.exports = translation;