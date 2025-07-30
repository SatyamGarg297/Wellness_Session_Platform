const Session = require("../models/Session");

// GET /sessions (public)
const getPublicSessions = async (req, res) => {
  const sessions = await Session.find({ status: "published" });
  res.json(sessions);
};

// GET /my-sessions (user's all)
const getMySessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.user });
  res.json(sessions);
};

// GET /my-sessions/:id (single session)
const getSingleSession = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user });
  if (!session) return res.status(404).json({ message: "Session not found" });
  res.json(session);
};

// POST /my-sessions/save-draft
const saveOrUpdateDraft = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;
  const data = { user_id: req.user, title, tags, json_file_url, status: "draft", updated_at: new Date() };

  let session;
  if (id) {
    session = await Session.findOneAndUpdate({ _id: id, user_id: req.user }, data, { new: true });
  } else {
    session = await Session.create(data);
  }

  res.status(200).json(session);
};

// POST /my-sessions/publish
const publishSession = async (req, res) => {
  const { id } = req.body;
  const session = await Session.findOneAndUpdate(
    { _id: id, user_id: req.user },
    { status: "published", updated_at: new Date() },
    { new: true }
  );

  if (!session) return res.status(404).json({ message: "Session not found" });

  res.json(session);
};

module.exports = {
  getPublicSessions,
  getMySessions,
  getSingleSession,
  saveOrUpdateDraft,
  publishSession,
};

