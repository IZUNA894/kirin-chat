const express = require("express");
var compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const v1Routes = require("./routes/v1");
const config = require("./config");
// const globalError = require("./middlewares/globalError");
//Initialise the express app.
const app = express();

const httpServer = require("http").createServer(app);

//using compression
app.use(compression());
//using helmet
app.use(helmet({ contentSecurityPolicy: false }));
app.use(helmet.hidePoweredBy());
//using cors
app.use(cors());

var distDir = path.join(__dirname, "/../build");
app.use(express.static(distDir));

//for logging req
// if (process.env.NODE_ENV === "developement") {
// const morgan = require("morgan");
// app.use(morgan("dev"));
// }

//Adding middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Using routes
app.use("/api", v1Routes);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// io.on("connection", socket => {
//   console.log("connection staeerted");

//   socket.on("join", data => {
//     console.log("socket joined....hurray");
//     console.log(data);
//   });
// });
const { socketController } = require("./controllers/socketController");
socketController(io);

//serving static files...if some missed above...
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/../build", "index.html"));
});

// const PORT = process.env.PORT || 3000;

// httpServer.listen(PORT, () =>
//   console.log(`server listening at http://localhost:${PORT}`)
// );
module.exports = httpServer;
