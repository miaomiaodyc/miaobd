var express = require('express');
var mongoClient=require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog";
var ObjectId=require("mongodb").ObjectId;
var router = express.Router();

//分类列表
router.get('/', function(req, res, next) {
  mongoClient.connect(DB_STR,function(err,client){
    if(err){
      res.send(err);
      return;
    }
       console.log("连接成功")
    var db=client.db('myblog');
      var c=db.collection("cats");
      c.find(). toArray(function(err, docs){
        if(err){
         res.send(err);
         return;
       }
        res.render('admin/category_list',{data:docs});
     });
   })
});
//添加分类
router.get('/add', function(req, res, next) {
    res.render('admin/category_add');
  });
  //添加分类的具体实现
  router.post('/add', function(req, res, next) {
    //获取表单提交的数据
    var title=req.body.title;
    var sort=req.body.sort;
    // console.log(title,sort)
    //将提交的数据连接的数据库
  
    mongoClient.connect(DB_STR,function(err,client){
      if(err){
        res.send(err)
        return;
      }
        console.log("连接成功")
      

      //连接成功，db就是myblog数据库
      //获取cats集合
      var db=client.db('myblog');
        var c=db.collection("cats");
        c.insert({title:title,sort:sort},function(err,result){
          if(err){
           res.send(err)
         }else{
            res.send("添加分类成功 <a href='/admin/cats'>查看分类列表 </a>")
         }
       })
       
     });

  });
  //编辑分类
  
  router.get('/edit', function(req, res, next) {
    var id=req.query.id;
    mongoClient.connect(DB_STR,function(err,client){
      if(err){
        res.send(err);
        return;
      }
         console.log("连接成功")
      var db=client.db('myblog');
        var c=db.collection("cats");
        c.find({_id:ObjectId(id)}). toArray(function(err, docs){
          if(err){
           res.send(err);
           return;
         }
          res.render('admin/category_edit',{data:docs[0]});
       });
     })
  });
  router.post('/edit', function(req, res, next){
    //获取表单数据
    var title=req.body.title;
    var sort=req.body.sort;
    var id=req.body.id;
    // console.info(title,sort,id)
    mongoClient.connect(DB_STR,function(err,client){
      if(err){
        res.send(err);
        return;
      }
      var db=client.db('myblog');
        var c=db.collection("cats");
     c.update({_id:ObjectId(id)},{$set:{"title":title,"sort":sort}},function(err,result){

         if(err){
           res.send(err);
         }else{
           res.send("更新成功 <a href='/admin/cats'>返回分类列表</a>")
         }
        })
      })
  });
  router.get('/delete',function(req,res,next){
    var id=req.query.id;
    mongoClient.connect(DB_STR,function(err,client){
      
      if(err){
      console.log(err);
      return;
    }
    var db=client.db('myblog');
    var c=db.collection("cats");
 c.remove({_id:ObjectId(id)},function(err,result){

     if(err){
       res.send(err);
       return;
     }else{
       res.redirect("/admin/cats")
     }
    })
  })
});

module.exports = router;