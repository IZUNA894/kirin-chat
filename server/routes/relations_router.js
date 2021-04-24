//this router here handle all relations related req..
// add a friend...deleting a friend from a usrs list..

var express = require("express");
var router = express.Router();
var Relations= require('../db/relations');
var auth = require('../middleware/auth_ware');

router.get("/rel/hello",function(req,res){
  res.send("hello from mongo db");
})


// add a friend to friend list ...
router.patch('/rel/addFriend',async function(req,res)
{
   var body = req.body;
   var {uid,sender} = body;
   var name = sender;
   var user = await Relations.find({name});
   if(user.length == 0){
       // if usr itself  doesnt exit ,create new , insert his friend ,(happen when usr is just new ,and just added his 1st friend)
       console.log("inisde if");
       var name = sender;
       var RelObj = new Relations({name});
       RelObj.isFriendWith.push({uid});
       var report = await RelObj.save();
      //  console.log(report)
       res.send(report);
   }
   else{
    // if usr rel exist ,simple insert the ask person into its rel...
    var name = sender;
       var RelObj = await Relations.find({name});
      //  console.log(RelObj);
       RelObj = RelObj[0];
       RelObj.isFriendWith.push({uid});
       var report = await RelObj.save();
       //console.log(report)
       res.send(report);
   }
   
},(err,req,res,next)=>{
  res.status(400).send({error:err.message});
});


//delete a friend from user friend list...
router.patch('/rel/deleteFriend',async function(req,res)
{
   var body = req.body;
   var {uid,sender} = body;
   var name = sender;
   var user = await Relations.find({name});
  //  console.log('user',user,'name',name);
   
      //  console.log("inside else");
       var name = sender;
       var RelObj = await Relations.find({name});
      //  console.log(RelObj);
       RelObj = RelObj[0];
       RelObj.isFriendWith = RelObj.isFriendWith.filter((idObj)=>{
                                                                return idObj.uid != uid
                                                               })
       var report = await RelObj.save();
       //console.log(report)
       res.send(report);
   
   
},(err,req,res,next)=>{
  res.status(400).send({error:err.message});
});


//get a user list...
router.get('/rel/getFriend',async function(req,res){
  
  var name = req.query.sender;
  var user = await Relations.find({name});
  // console.log('getFriend',user,name);
  if(user.length == 0){
    //if usr doesnt have friends
    res.status(200).send([]);
  }
  else{
    // if usr has friends...
    //we will first fill the enteries from foreign model,then send it
    await Relations.find({name}).populate({
       path:'isFriendWith.uid',
       model:'Users',
       select:{
         'name':1,
         'email':1,
         'username':1
       }
      }).
    exec(async function (err, usr) {
      if (err) return handleError(err);
      // console.log('in population ' ,usr[0].isFriendWith);
      var report = await usr[0].save();
      //console.log('report',JSON.stringify(report));
      res.status(200).send(JSON.stringify(usr[0].isFriendWith));
    
    });
    
  }
})
module.exports = router;