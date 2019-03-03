const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }]
});

mongoose.model("Chat", chatSchema);
