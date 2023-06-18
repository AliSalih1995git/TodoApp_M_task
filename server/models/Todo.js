const mongoose = require("mongoose");

const todoScheema = new mongoose.Schema({
  text: {
    type: String,
    require: [true, "Title is required"],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", todoScheema);
