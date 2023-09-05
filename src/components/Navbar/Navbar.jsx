import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  return (
    <nav>
      <h1>Apartment Admin</h1>

      {isLoggedIn && (
        <div className="NavButtons">
          <Link to="/dashboard" className="linkButton">
            Dashboard
          </Link>
          <Link to="/profile" className="linkButton">
            Profile
          </Link>
          <Link onClick={logOutUser} className="linkButton">
            Logout
          </Link>
        </div>
      )}

      {!isLoggedIn && (
        <div className="NavButtons">
          {location.pathname !== "/" ? (
            <Link to="/" className="linkButton">
              Home
            </Link>
          ) : null}
          <Link to="/signup" className="linkButton">
            Sign Up
          </Link>
          <Link to="/login" className="linkButton">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
