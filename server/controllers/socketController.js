const Messages = require("../database").getMessageCollection();

module.exports.socketController = io => {
  io.on("connection", socket => {
    socket.on("join", async data => {
      socket.join(data);
      console.log("socket joined");
      console.log(data);
    });

    // forward the private message to the right recipient (and to other tabs of the sender)
    socket.on("message_send", message => {
      message["date_added"] = new Date();
      message["date_created"] = new Date();
      console.log("now sending to ", message.to);
      socket.broadcast
        .to(message.to)
        // .to(socket.userID)
        .emit("message_recieved", message);
      const { from, to } = message;
      let token = from < to ? from + to : to + from;

      Messages.findOneAndUpdate(
        { token },
        { $push: { messages: message } },
        { upsert: true }
      );
    });
  });
};
