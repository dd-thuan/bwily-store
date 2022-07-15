const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Category = require("../models/categoryModel");
const ErrorHander = require("../utils/errorHander");

// Create Category -- Admin
exports.createCategory = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

// Get All Categories
exports.getAdminCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});




// Detail Category
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// Update Category -- Admin
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const newCategory = {
    name: req.body.name,
    description: req.body.description,
  };

  await Category.findByIdAndUpdate(req.params.id, newCategory, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete Category -- Admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully!!",
  });
});

