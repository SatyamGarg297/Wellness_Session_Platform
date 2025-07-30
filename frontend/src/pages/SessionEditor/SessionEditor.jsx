import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SessionEditor.css";
import API from "../../services/api";

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: "", 
    tags: "", 
    json_file_url: "" 
  });
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });
  const [timeoutId, setTimeoutId] = useState(null);

  // Fetch existing draft
  useEffect(() => {
    if (id) {
      API.get(`/my-sessions/${id}`)
        .then((res) => {
          setForm({
            title: res.data.title,
            tags: res.data.tags.join(", "),
            json_file_url: res.data.json_file_url,
          });
        })
        .catch(() => {
          setStatusMsg({ 
            text: "Failed to load session", 
            type: "error" 
          });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);

    // Auto-save after 5s of no typing
    if (timeoutId) clearTimeout(timeoutId);
    const newTimeout = setTimeout(() => {
      saveDraft(newForm);
    }, 5000);
    setTimeoutId(newTimeout);
  };

  const saveDraft = async (data) => {
    try {
      const res = await API.post("/my-sessions/save-draft", {
        id,
        ...data,
        tags: data.tags.split(",").map((tag) => tag.trim()),
      });
      setStatusMsg({ 
        text: "Draft auto-saved ", 
        type: "success" 
      });
      if (!id) navigate(`/editor/${res.data._id}`);
    } catch (error) {
      console.error(error);
      
      setStatusMsg({ 
        text: "Draft save failed", 
        type: "error" 
      });
    }
  };

  const handlePublish = async () => {
    if (!id) {
      setStatusMsg({ 
        text: "Please save draft first", 
        type: "error" 
      });
      return;
    }
    
    try {
      await API.post("/my-sessions/publish", { id });
      setStatusMsg({ 
        text: "Published successfully! Redirecting...", 
        type: "success" 
      });
      setTimeout(() => navigate("/my-sessions"), 1500);
    } catch (err) {
      setStatusMsg({ 
        text: err.response?.data?.message || "Publish failed", 
        type: "error" 
      });
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2 className="editor-title">Session Editor</h2>
      </div>

      {statusMsg.text && (
        <div className={`status-message status-${statusMsg.type}`}>
          {statusMsg.text}
        </div>
      )}

      <form className="editor-form">
        <div className="form-group">
          <label className="form-label">Session Title</label>
          <input
            className="editor-input"
            name="title"
            placeholder="Enter session title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <input
            className="editor-input"
            name="tags"
            placeholder="Comma-separated tags (e.g., wellness, meditation)"
            value={form.tags}
            onChange={handleChange}
          />
          <p className="tags-hint">Separate multiple tags with commas</p>
        </div>

        <div className="form-group">
          <label className="form-label">JSON File URL</label>
          <input
            className="editor-input"
            name="json_file_url"
            placeholder="https://example.com/session-data.json"
            value={form.json_file_url}
            onChange={handleChange}
          />
        </div>

        <div className="editor-actions">
          <button
            type="button"
            className="action-btn save-draft"
            onClick={() => saveDraft(form)}
          >
            Save Draft
          </button>
          <button
            type="button"
            className="action-btn publish"
            onClick={handlePublish}
            disabled={!id}
          >
            Publish Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionEditor;