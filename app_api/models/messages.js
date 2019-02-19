var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  text: { type: String },
  author: { type: String, required: true },
  dateTime: { type: Date, default: Date.now }
});

mongoose.model("Message", messageSchema);
