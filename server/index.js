const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");

var UserRouter = require("./routers/user_router");
var MsgRouter = require("./routers/msg_router");
var RelRouter = require("./routers/relations_router");

require('./db/mongoose');

var app = express();
var publicPath= path.join(__dirname , "../","/public");
var server = http.createServer(app);

app.use(express.json());
app.use(express.static(publicPath),(req,res,next)=>{
  next();
});
app.use(require("cors")());
app.use(
  cors({
    origin: [process.env.APP_LINK],
    credentials: true
  })
);

app.use(UserRouter);
app.use(MsgRouter);
app.use(RelRouter);

var io= socket(server)
const {socketUtil} = require('./socketUtil.js');
//console.log(socketUtil);
socketUtil(io);

app.get('/hello',function(req,res){
 res.end("hello from express sever req processing");
});
var port = process.env.PORT || 3001
server.listen(port,()=>{
  console.log("listening on port " , port);
});


