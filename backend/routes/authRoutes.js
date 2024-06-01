// backend/routes/authRoutes.js
const express = require("express");
const {
  registerUser,
  authUser,
  deleteUser,
  updateUser,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.delete("/delete", protect, deleteUser);
router.put("/update", protect, updateUser);
router.get("/me", protect, getMe);

module.exports = router;
