const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getPublicSessions,
  getMySessions,
  getSingleSession,
  saveOrUpdateDraft,
  publishSession,
} = require("../controllers/sessionController");

router.get("/sessions", getPublicSessions);
router.get("/my-sessions", protect, getMySessions);
router.get("/my-sessions/:id", protect, getSingleSession);
router.post("/my-sessions/save-draft", protect, saveOrUpdateDraft);
router.post("/my-sessions/publish", protect, publishSession);

module.exports = router;
