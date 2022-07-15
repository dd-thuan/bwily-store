const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter category Name"],
    trim: true,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);