const express = require("express");
const {
  createCategory,
  getAdminCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { isAuthenticated, authorizeToRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/category/new")
  .post(isAuthenticated, authorizeToRoles("admin"), createCategory);

router
  .route("/categories").get(isAuthenticated, authorizeToRoles("admin"),getAdminCategories);

router.
  route("/category/:id")
  .get(isAuthenticated, authorizeToRoles("admin"), getCategoryDetails)
  .put(isAuthenticated, authorizeToRoles("admin"), updateCategory)
  .delete(isAuthenticated, authorizeToRoles("admin"), deleteCategory)
  .get(isAuthenticated);

module.exports = router;