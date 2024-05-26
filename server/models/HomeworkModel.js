const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    dueWeek: {
      type: Number,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Homework = mongoose.model("Homework", homeworkSchema);

module.exports = Homework;
