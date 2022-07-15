const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticated, authorizeToRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticated, authorizeToRoles("admin"), getAdminProducts);

router
  .route("/product/new")
  .post(isAuthenticated, authorizeToRoles("user"), createProduct);

router
  .route("/product/:id")
  .put(isAuthenticated, authorizeToRoles("user"), updateProduct)
  .delete(isAuthenticated, authorizeToRoles("admin"), deleteProduct)
  .get(isAuthenticated);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
