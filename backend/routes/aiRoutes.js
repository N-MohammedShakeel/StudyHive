// backend/routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const {
  summarizeContent,
  generateStudyPlan,
  explainTopic,
} = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/summarize", authMiddleware, summarizeContent);
router.post("/study-plan", authMiddleware, generateStudyPlan);
router.post("/explain", authMiddleware, explainTopic);

module.exports = router;
