var express = require('express');
var mongoClient=require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/dycblog";
var ObjectId=require("mongodb").ObjectId;
var router = express.Router();

//显示文章列表
router.get('/', function(req, res, next) {
  //获取文章
  mongoClient.connect(DB_STR,function(err,client){
      
      if(err){
      console.log(err);
      return;
    }
    var db=client.db('dycblog');
    var c=db.collection("posts");
 c.find().toArray(function(err,docs){

     if(err){
       res.send(err);
       return;
     }else{
       res.render('admin/article_list',{data:docs})
     }
    })
  })
});




//添加文章
router.get('/add', function(req, res, next) {

  mongoClient.connect(DB_STR,function(err,client){
    if(err){
      res.send(err);
      return;
    }
    //    console.log("连接成功")
    var db=client.db('dycblog');
      var c=db.collection("cats");
      c.find(). toArray(function(err, docs){
        if(err){
         res.send(err);
         return;
       }
        res.render('admin/article_add',{data:docs});
     });
   })
});
//完成具体添加文章的功能
router.post('/add',function(req,res){
  //完成表单提交的数据
  var title=req.body.title;
    var cat=req.body.cat;
    var summary=req.body.summary;
    var content=req.body.content;
    //发布文章的时间
    var time=new Date();
    var post={
      "cat":cat,
      "title":title,
      "summary":summary,
      "content":content,
      "time":time
    }

 mongoClient.connect(DB_STR,function(err,client){
      
      if(err){
      console.log(err);
      return;
    }
    var db=client.db('dycblog');
    var c=db.collection("posts");
 c.insert(post,function(err,result){

     if(err){
       res.send(err);
       return;
     }else{
       res.send('添加文章成功，<a href="/admin/posts">查看文章列表</a>')
     }
    })
  })
});

module.exports = router;