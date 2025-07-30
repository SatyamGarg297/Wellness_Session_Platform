import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="nav-link">Dashboard</Link>
      </div>
      
      <button 
        className="menu-toggle" 
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <ul className={isMenuOpen ? 'active' : ''}>
        {token ? (
          <>
            <li>
              <Link to="/my-sessions" className="nav-link">My Sessions</Link>
            </li>
            <li>
              <button onClick={logout} className="nav-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;