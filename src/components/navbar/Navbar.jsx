// Path: src/components/navbar/Navbar.jsx

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/logo.jpeg";
import { logout } from "../../utils/fetch";

const Navbar = ({ token, user, setUser, avatar }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout(token);
      setUser(null);
      document.cookie =
        "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={user ? "/home" : "/"} className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-name">SQUADS</span>
        </Link>

        <div className="nav-links">
          {user ? (
            <>
              <Link to={`/explorer`} className="nav-link">
                Explore
              </Link>
              <Link to={`/profile/${user?.username}`} className="nav-link">
                {avatar ? (
                  <>
                    <img src={avatar} alt="User avatar" className="avatar" />
                    <span>{user?.username}</span>
                  </>
                ) : (
                  "Profile"
                )}
              </Link>
              <button onClick={handleLogout} className="nav-link logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  avatar: PropTypes.string,
  token: PropTypes.string,
};

export default Navbar;
