import socketIOClient from "socket.io-client";
var END_POINT = "http://localhost:8080/";
var socket = socketIOClient(END_POINT, { autoConnect: false });

export const sendMessage = (message) => {
  socket.emit("message_send", message);
};

export const recieveMessage = (cb) => {
  socket.on("message_recieved", (message) => {
    console.log("message body received as:", message);

    cb(message);
  });
};

// export const recieveMessage = (cb) => {
//   socket.on("abc", (message) => {
//     console.log("message body received as:dddd", message);

//     cb(message);
//   });
// };

export const join = (name) => {
  socket.auth = { username: name };
  socket.connect();
  socket.emit("join", name);
  console.log(name);
};
// export const recieveMessage = () => console.log("he");
