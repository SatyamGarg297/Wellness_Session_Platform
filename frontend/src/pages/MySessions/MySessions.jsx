import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MySessions.css";
import API from "../../services/api";

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

  if (isLoading) {
    return <div className="my-sessions">Loading your sessions...</div>;
  }

  return (
    <div className="my-sessions">
      <div className="my-sessions-header">
        <h2 className="my-sessions-title">My Sessions</h2>
        <button 
          className="create-new-btn"
          onClick={() => navigate("/editor")}
        >
          <span>+</span> Create New
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="empty-state">
          You haven't created any sessions yet
        </div>
      ) : (
        <div className="session-list">
          {sessions.map((session) => (
            <div className="session-card" key={session._id}>
              <div className="session-header">
                <h4 className="session-title">{session.title}</h4>
                <span className={`session-status status-${session.status.toLowerCase()}`}>
                  {session.status}
                </span>
              </div>
              <div className="session-tags">
                {session.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="session-actions">
                <button 
                  className="edit-btn"
                  onClick={() => navigate(`/editor/${session._id}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;