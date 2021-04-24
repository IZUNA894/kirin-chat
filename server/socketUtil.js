// this file is for socket io logics
// this is where socket recieve n send the message
//this file handle all socket related logics...

var socketUtil = io => {
  var RawMsg = require("./db/rawMsg");
  var Relations = require("./db/relations");
  var RelMsg = require("./db/relMsg");
  var User = require("./db/user_module");
  // a filter for blocking of abusive msg
  const Filter = require("bad-words");
  var filter = new Filter();

  io.on("connection", socket => {
    // if new user arrives...

    console.log("connected");
    socket.on("join", function(name) {
      socket.join(name.toString());
      console.log("joined" + name);
    });

    // when msg is recieved...
    socket.on("sendMsg", async (msg, callback) => {
      console.log("msg recieved");
      console.log(msg.val);

      if (filter.isProfane(msg.value)) {
        callback(undefined, { error: "blocked!" });
      } else {
        callback("succes", undefined);
        console.log("msg recieved");
        console.log("sending msg to");
        console.log(msg.reciever);

        var reciever = msg.reciever;
        var sender = msg.sender;
        var val = msg.val;
        var time = msg.time;
        var tokenId = "";
        var MsgObj = new RawMsg({
          reciever: msg.reciever,
          sender: msg.sender,
          val: msg.val,
          time: msg.time
        });
        MsgObj.save();

        var tokenId = sender < reciever ? sender + reciever : reciever + sender;

        var RelMsgObj = await RelMsg.findOne({ tokenId });
        console.log(RelMsgObj);

        if (RelMsgObj == null) {
          // if we dont find a required rel ...i.e first time msg b/w 2 persons
          RelMsgObj = new RelMsg({
            tokenId,
            msgs: [
              {
                sender,
                reciever,
                val,
                time
              }
            ]
          });
          RelMsgObj.save();
        } else {
          // if we have find rel. i.e its not the first time..
          var msgsArray = RelMsgObj.msgs;
          msgObj = { reciever, sender, val, time };
          msgsArray = [...msgsArray, msgObj];
          console.log(msgsArray);
          var result = await RelMsg.updateOne({ tokenId }, { msgs: msgsArray });
          console.log(result);
        }

        //now sending the msg to requesting user...
        socket.broadcast.to(msg.reciever).emit("recieveMsg", msg);
        // callback();
      }
    });

    // if a user leave..
    socket.on("disconnect", () => {
      //sendLeaveBanner(socket);
    });

    console.log("connection establlished");
  });
};

module.exports.socketUtil = socketUtil;
