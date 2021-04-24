const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./messageStore");
const messageStore = new InMemoryMessageStore();
const Messages = require("../database").getMessageCollection();

module.exports.socketController = io => {
  //middle ware...
  // io.use((socket, next) => {
  //   const sessionID = socket.handshake.auth.sessionID;
  //   if (sessionID) {
  //     const session = sessionStore.findSession(sessionID);
  //     if (session) {
  //       socket.sessionID = sessionID;
  //       socket.userID = session.userID;
  //       socket.username = session.username;
  //       return next();
  //     }
  //   }
  //   const username = socket.handshake.auth.username;
  //   if (!username) {
  //     return next(new Error("invalid username"));
  //   }
  //   socket.sessionID = randomId();
  //   socket.userID = randomId();
  //   socket.username = username;
  //   next();
  // });
  io.on("connection", socket => {
    // console.log("connection started");
    // persist session
    // sessionStore.saveSession(socket.sessionID, {
    //   userID: socket.userID,
    //   username: socket.username,
    //   connected: true
    // });

    socket.on("join", async data => {
      socket.join(data);
      console.log("socket joined");
      console.log(data);
    });
    // emit session details
    // setInterval(
    //   () =>
    //     socket.emit("abc", {
    //       from: "redok_basfit",
    //       to: "izuna894",
    //       value: "are chl gya"
    //     }),
    //   2000
    // );

    // join the "userID" room
    // socket.join(socket.userID);

    // // fetch existing users
    // const users = [];
    // const messagesPerUser = new Map();
    // messageStore.findMessagesForUser(socket.userID).forEach(message => {
    //   const { from, to } = message;
    //   const otherUser = socket.userID === from ? to : from;
    //   if (messagesPerUser.has(otherUser)) {
    //     messagesPerUser.get(otherUser).push(message);
    //   } else {
    //     messagesPerUser.set(otherUser, [message]);
    //   }
    // });

    // sessionStore.findAllSessions().forEach(session => {
    //   users.push({
    //     userID: session.userID,
    //     username: session.username,
    //     connected: session.connected,
    //     messages: messagesPerUser.get(session.userID) || []
    //   });
    // });
    // socket.emit("users", users);

    // notify existing users
    // socket.broadcast.emit("user connected", {
    //   userID: socket.userID,
    //   username: socket.username,
    //   connected: true,
    //   messages: []
    // });

    // forward the private message to the right recipient (and to other tabs of the sender)
    socket.on("message_send", message => {
      message["date_added"] = new Date();
      message["date_created"] = new Date();
      console.log("now sending to ", message.to);
      socket.broadcast
        .to(message.to)
        // .to(socket.userID)
        .emit("message_recieved", message);
      // messageStore.saveMessage(message);

      Messages.insertOne(message);
    });

    // notify users upon disconnection
    socket.on("disconnect", async () => {
      const matchingSockets = await io.in(socket.userID).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit("user disconnected", socket.userID);
        // update the connection status of the session
        sessionStore.saveSession(socket.sessionID, {
          userID: socket.userID,
          username: socket.username,
          connected: false
        });
      }
    });
  });
};
