const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSinglelUser,
  updateUserRole,
  deleteUser,
  registerUserAdmin,
  contact,
} = require("../controllers/userController");
const { isAuthenticated, authorizeToRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticated, userDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router
  .route("/users")
  .get(isAuthenticated, authorizeToRoles("admin"), getAllUsers);

router
  .route("/user/:id")
  .get(isAuthenticated, authorizeToRoles("admin"), getSinglelUser)
  .put(isAuthenticated, authorizeToRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeToRoles("admin"), deleteUser);

module.exports = router;
