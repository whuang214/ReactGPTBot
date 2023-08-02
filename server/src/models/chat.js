const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    sender: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

const chatHistorySchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);

module.exports = {
  ChatHistory,
  Message,
};
