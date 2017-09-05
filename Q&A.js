var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/xLRS";



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    db.collection("tincan").count({},function(err,num_doc) {
      if (err) return err;
      console.log("1. tincan 總共有: "+num_doc+"  document.");
    });

    var latestdoc = db.collection("tincan").findOne({}, {sort:{$natural:-1}},function(err,result) {
        if (err) return err;
        console.log("2. 最近一筆 object.id 的值為"+ result.object.id);
    });

    db.collection("tincan").find({"verb.id":"http://activitystrea.ms/schema/1.0/watch"}).count({},function(err,num_verid){
        if (err) return err;    
        console.log("3. "+num_verid+"筆");
    });
 
    var findtarget = { "actor.account.name" : "3f914b82-1503-11e5-b939-0800200c9a66", "verb.id": "http://activitystrea.ms/schema/1.0/watch" };
    db.collection("tincan").find(findtarget).count({},function(err,num_target){
        if (err) return err;
        console.log("4. "+ num_target+"筆");
    });

    db.collection("tincan").find({"result.score.raw":true,"result.score.raw":{$gte:60}}).count({},function(err,num_score){
        if (err) return err;
        console.log("5. "+ num_score+"筆");
    });
    
    db.collection("tincan").distinct('verb.id',function(err,aaa) {
        console.log("6. "+aaa.length);
    });

//    .findOne({}, {sort:{$natural:-1}},function(err,result)
    //object.id 為 http://acrossX/activities/book/0123456789/finalassessment 的 document 中，其 result.score.raw 值最低者的 actor.account.name 為?
  
    console.log("eeeee. ");
    console.log(db.collection("tincan").find({"object.id":"http://acrossX/activities/book/0123456789/finalassessment"}).sort({ "result.score.raw" : "1" }).limit(1));

});
