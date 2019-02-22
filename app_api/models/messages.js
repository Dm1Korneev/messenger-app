var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  text: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateTime: { type: Date, default: Date.now }
});

mongoose.model("Message", messageSchema);
