// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const passport = require("../config/authConfig");
const {
  signup,
  login,
  googleCallback,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

module.exports = router;
