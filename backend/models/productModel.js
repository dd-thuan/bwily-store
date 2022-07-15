const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please Enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: String,
    required: [true, "Please Enter your phone"]
  },
  address: {
    type: String,
    required: ["Please Enter your address"]
  },

  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    require: true,
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
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

module.exports = mongoose.model("Product", productSchema);
