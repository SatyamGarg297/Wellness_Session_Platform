import React from "react";
import { Link } from "react-router-dom";
import "./SessionCard.css";

const SessionCard = ({ s }) => {
  return (
    <div className={`s-card ${s.status}`}>
      <div className="s-card-header">
        <h3 className="s-title">{s.title}</h3>
        <span className={`s-status ${s.status}`}>{s.status}</span>
      </div>
      <div className="s-date">
        {new Date(s.created_at).toLocaleDateString()}
      </div>
      <div className="s-tags">
        {s.tags.map((tag) => (
          <span key={tag} className="s-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="s-card-actions">
        <Link to={`/edit/${s._id}`} className="edit-button">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
