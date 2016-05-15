var express = require('express');
var translation = express.Router();


translation.get('/',function(req,res,next){
    res.render('translation',{
        title:'翻译',
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
});

module.exports = translation;