// this model is storing msg directly into db
// logically this serves no benefit in our app ...becoz we are also storing msgs according to their relations in relMsg.js
// this just serves as secondry database in case accidentally relmsg got swept

// a doc in this model will look like
// {
//     "reciever": "uzumaki_tony",
//     "sender": "jhonny",
//     "value": "hhelo",
//      "type":"text"/"media"/"geolocation"
//     "date_added": "1584219134899"

//     "date_updated": "1584219134899",
//
// }

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    sender: {
      required: true,
      type: String,
      trim: true
    },
    reciever: {
      required: true,
      type: String,
      trim: true
    },
    val: {
      type: String,
      required: true,
      trim: true
    },
    time: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

var RawMsg = mongoose.model("RawMsg", userSchema);
module.exports = RawMsg;
