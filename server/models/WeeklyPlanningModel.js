const mongoose = require("mongoose");

const planningSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    week: {
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
  },
  {
    timestamps: true,
  }
);

const WeeklyPlanning = mongoose.model("WeeklyPlanning", planningSchema);

module.exports = WeeklyPlanning;
