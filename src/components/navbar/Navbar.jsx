import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./Navbar.scss";
import logo from "../../assets/logo.jpeg";
import { logout } from "../../utils/fetch";

const Navbar = ({ user, setUser, avatar }) => {
  const handleLogout = async () => {
    try {
      await logout(user.authToken);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={user ? "/home" : "/"} className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div className="nav-links">
          {user ? (
            <>
              <Link to={`/profile/${user.username}`} className="nav-link">
                {avatar ? <img src={avatar} alt="User avatar" className="avatar" /> : "Profile"}
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
};

export default Navbar;
