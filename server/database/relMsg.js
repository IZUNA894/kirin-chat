// this model is made for storing msg against to their relations
//this is done so when user fetch their msg ,mongo dont have to go individual raw msg ...one by one...which will take extra time...
// instead it search for a tokenId and find their all msg at one place
// this approach is good when our app becomes big and have to handles thousands of msgs..
//basically a mongo doc will look like
        // {
        //     _id:XXXXXXXXXXXXXXX,
        //     tokenId:'harveyjohn',
        //     msgs:{
                    
        //             {
        //               sender:'john',
        //               reciever:'harvey',
        //               val:"hello there",
        //               time:'12:45 PM'
        //             },
        //             {
        //               sender:'john',
        //               reciever:'harvey',
        //               val:"hello there",
        //               time:'12:45 PM'
        //             },
        //             {
        //               sender:'john',
        //               reciever:'harvey',
        //               val:"hello there",
        //               time:'12:45 PM'
        //             },
        //             .
        //             .
        //             .
        //             .
        //     }
        // }
var mongoose= require('mongoose');

var userSchema  = new mongoose.Schema({
  tokenId:{
      required:true,
      type:String,
      trim:true
  },
  msgs:[
    {
        sender: {
            required:true,
            type:String,
            trim:true,
        },
        reciever: {
            required:true,
            type:String,
            trim:true,
        },
        val:{
            type:String,
            required:true,
            trim:true,
        },
        time:{
            type:String,
            required:true,
            trim:true
        }
    }
  ]
  
},
{
  timestamps:true
} );



userSchema.pre('save' , async function(next){
  var user = this;

  // this is middleware....for nothing
  next();
});





var RelMsg = mongoose.model('RelMsg', userSchema);
module.exports =RelMsg;
