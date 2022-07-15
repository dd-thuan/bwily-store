const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorHander");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");


// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;


  const { fullname, email, address, phone, category, price, stock } = req.body
  const product = await Product.create(req.body);

  const message = `You have just submmit\n
  Fullname: ${fullname}\n
  Email: ${email}\n
  Address: ${address}\n 
  Phone: ${phone}\n
  Category: ${category}\n
  Price: ${price}.\n
  Images: ${images.url}\n
  Stock: ${stock}\n\n
  Thank you for visited our store`

  await sendEmail({
    email: user.email,
    subject: `Ecommerce Password Recovery`,
    message,
  });
  res.status(201).json({
    success: true,
    product,
    message: `Email sent to ${user.email} sucessfully`
  });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product -- Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Detail product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Image here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  const { fullname, email, address, phone, category, price, stock } = req.body
  const message = `You have just submmit\n
  Fullname: ${fullname}\n
  Email: ${email}\n
  Address: ${address}\n 
  Phone: ${phone}\n
  Category: ${category}\n
  Price: ${price}.\n
  Images: ${images.url}\n
  Stock: ${stock}\n\n
  Thank you for visited our store`

  await sendEmail({
    email: user.email,
    subject: `Cập nhật lại sản phẩm`,
    message,
  });

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });


  res.status(200).json({
    success: true,
    product,
    message: `Email sent to ${user.email} sucessfully`
  });
});

// Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product was delete successfully",
  });
});