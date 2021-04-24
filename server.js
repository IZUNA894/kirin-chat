const database = require("./server/database");
const PORT = process.env.PORT || 8080;

database
  .connect()
  .then(() => {
    console.log("----------DATABASE CONNECTED----------");
    const app = require("./server/app");
    return app.listen(PORT);
  })
  .then(() => {
    console.log(`--------SERVER LISTENING-------${PORT}`);
  })
  .catch((error) => {
    console.log("----------ERROR----------");
    // database.disconnect();
    console.log(error.message);
    console.log(error.stack);
  });
