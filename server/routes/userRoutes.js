import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} from "../controllers/userController.js";
import {
  createStaff,
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

//CREATES CUSTOMER
router.post("/signup", signup);

//CREATES STAFF
router.post("/createStaff", protect, restrictTo("admin"), createStaff);

//LOGIN & LOGOUT
router.post("/login", login);
router.get("/logout", logout);

//GET MY PROFILE ID AND PROFILE DATA
router.get("/me", protect, getMe, getUser);

//UPDATE MY PASSWORD
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword", protect, updatePassword);

/// UPDATE MY PROFILE DATA
router.patch("/updateMe", protect, updateMe);

//DELETE
router.delete("/deleteMe", protect, deleteMe);

// PROTECTS ALL ROUTES AFTER THIS MIDDLEWARE AND RESTRICTS TO ADMIN
router.use(protect, restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
