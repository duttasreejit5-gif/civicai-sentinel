import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🛡 CivicAI Sentinel
      </div>

      <div className="nav-menu">
        <Link to="/">Home</Link>

        <a href="#">Features</a>

        <a href="#">About</a>

        <Link to="/dashboard">
          <button className="login-btn">
            Officer Dashboard
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;