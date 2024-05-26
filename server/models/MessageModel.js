const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: {
        type: String,
        required: true,
      },
      to: {
        type: [String, mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "User",
      },
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messagesSchema);

module.exports = Message;
