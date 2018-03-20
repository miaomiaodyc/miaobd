var express = require('express');
var mongoClient=require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog";
var ObjectId=require("mongodb").ObjectId;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});
//用户登录处理

router.post('/signin',function(req,res){
  var username=req.body.username;
  var pwd=req.body.pwd;
  console.log(username,pwd)
//得到密码需要和数据库的密码作对比
  mongoClient.connect(DB_STR,function(err,client){
      
    if(err){
    res.send(err);
    return;
  }
  var db=client.db('myblog');
  var c=db.collection("user");
c.find({username:username,pwd:pwd}). toArray( function(err,docs){

   if(err){
     res.send(err);
     return;
   }
   if(docs.length){
     //登录成功
     req.session.isLogin=true;
     res.redirect('/admin/index')
   }
   else{
     res.redirect('/admin/users')
   }
  })
})
});
//用户注销
router.get('/logout',function(req,res){
//清除session
  req.session.isLogin=null;
  res.redirect('/admin/users')
})
module.exports = router;
