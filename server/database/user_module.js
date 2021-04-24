// this model will store user info 

var validator= require('validator');
var mongoose= require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

var userSchema  = new mongoose.Schema({
    name: {
      required:true,
      type:String,
      trim:true,
    },
    username:{
      required:true,
      type:String,
      trim:true,
      unique:true,
      lowercase:true
    },
    phoneno:{
      type:String,
      default:10,
      required:true,
      min:0,
      // unique:true,          //remove this line comment if u want phone no, to be unique...
      validate(value){
        if(!validator.isMobilePhone(value))
        throw new Error("phone number is not valid");
      }

    } ,
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    // unique:true,                remove this line comment if u want phone no, to be unique...
    validate(value){
      if(!validator.isEmail(value))
      throw new Error("email is not valid");
    }
  },
  password:{
    type:String,
    trim:true,
    minlength:8,
    required:true
  },
  tokens:[
    {
      token:{
        required:true,
        type:String
      }
    }
  ],
  avatar:{
    type:Buffer,
    default:null
  }
},
{
  timestamps:true
} );



// function to hash the password before save
userSchema.pre('save' , async function(next){
  var user = this;
  
  var hashedPass ="";
  if(user.isModified('password'))
  {
   hashedPass =  await bcrypt.hash(user.password,8);
   user.password =hashedPass;
  }
  next();
});



//function to get jwt token
userSchema.methods.getAuthToken = async function(){
  var user = this;
  var token = await jwt.sign({_id:user._id.toString()},process.env.JWT_SECRETKEY);
  user.tokens= user.tokens.concat({token});
  await user.save();
  return token;

}

userSchema.methods.toJSON = function (){
  var user= this;
  user = user.toObject();
   delete user.tokens;
   delete user.password;
   delete user.__v;
   delete user.avatar;
  //console.log(user);
  return user;
}

//this function is use to find if a usr exists in database ot not
// called at a time of login
userSchema.statics.findByCredentials = async (email,password) =>
{
  var user = await User.findOne({email});
  if(!user){
    // throw new Error("unable to login");
    return undefined;
  }
  //console.log(password,user.password);
  var result = await bcrypt.compare(password,user.password)
  
  if(!result)
  {
    return undefined
  }
  //console.log(result);
  return user
}

var User = mongoose.model('Users', userSchema);
module.exports =User;
