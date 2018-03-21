var express = require('express');
var mongoClient=require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/dycblog";
var ObjectId=require("mongodb").ObjectId;
var router = express.Router();

  
  router.get('/', function(req, res, next) {
 //获取id
 var id=req.query.id;
  mongoClient.connect(DB_STR,function(err,client){
      
      if(err){
      console.log(err);
      return;
    }
    var db=client.db('dycblog');
    var c=db.collection("posts");
 c.find({_id:ObjectId(id)}).toArray(function(err,docs){

     if(err){
       res.send(err);
       return;
     }else{
       res.render('home/article',{data:docs[0]})
     }
    })
  })
});

module.exports = router;