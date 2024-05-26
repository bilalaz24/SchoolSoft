const mongoose = require("mongoose");

const lunchSchema = new mongoose.Schema({
  week: {
    type: Number,
    required: true,
  },
  menus: [
    {
      day: {
        type: String,
        required: true,
      },
      main: {
        type: String,
        required: true,
      },
      vegetarian: {
        type: String,
        required: true,
      },
    },
  ],
});

const LunchMenu = mongoose.model("LunchMenu", lunchSchema);

module.exports = LunchMenu;
