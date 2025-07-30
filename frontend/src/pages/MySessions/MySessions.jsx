import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MySessions.css";
import API from "../../services/api";
import SessionCard from "../SessionCard/SessionCard";

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        const res = await API.get("/my-sessions");
        setSessions(res.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMySessions();
  }, []);

  const publishSession = sessions.filter(
    (session) => session.status === "published"
  );
  const saveOrUpdateDraft = sessions.filter(
    (session) => session.status === "draft"
  );

  if (isLoading) {
    return <div className="my-sessions">Loading your sessions...</div>;
  }

  return (
    <div className="my-sessions">
      <div className="my-sessions-header">
        <button className="create-new-btn" onClick={() => navigate("/editor")}>
          <span>+</span> Create New
        </button>
      </div>

      <h2 className="my-sessions-title">Published Sessions</h2>
      {sessions.length === 0 ? (
        <div className="empty-state">
          You haven't created any published sessions yet
        </div>
      ) : (
        <div className="session-list">
          {publishSession.map((session) => (
            <SessionCard key={session._id} s={session} />
          ))}
        </div>
      )}

      <h2 className="my-sessions-title">Drafts</h2>
      {sessions.length === 0 ? (
        <div className="empty-state">No drafts session found</div>
      ) : (
        <div className="session-list">
          {saveOrUpdateDraft.map((session) => (
            <SessionCard key={session._id} s={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;
