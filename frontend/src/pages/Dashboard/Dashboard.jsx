import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import API from "../../services/api";
import "../SessionCard/SessionCard.css"

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/sessions");
        setSessions(res.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading sessions...</div>;
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-header">Public Wellness Sessions</h2>

      {sessions.length === 0 ? (
        <div className="empty-state">No sessions available</div>
      ) : (
        <div className="session-list">
          {sessions.map((s) => (
            <div className="s-card" key={s._id}>
             <div className="s-card-header">
              <h3 className="s-title">{s.title}</h3>
              <span className={`s-status ${s.status}`}>{s.status}</span>
              </div>
              <div className="s-tags">
                {s.tags.map((tag) => (
                  <span className="s-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <a
                // href={s.json_file_url}
                className="json-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                View Session Data
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
