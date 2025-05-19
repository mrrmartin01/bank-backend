const express = require("express");
const router = express.Router();
const {
  createAccount,
  updateAccount,
  getMyAccounts,
  getAllAccounts,
} = require("../controllers/accountController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/create", protect, createAccount);
router.get("/", protect, getMyAccounts);
router.patch("/update/:id", protect, updateAccount);
router.patch("/admin-update/:id", protect, isAdmin, updateAccount); //for admin to update any account
router.get("/all", protect, isAdmin, getAllAccounts);

module.exports = router;
