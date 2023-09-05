import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./HomePage.css";

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        <h2>Apartment Admin</h2>
        <div className="hero">
        <img src="./landing-page-icon.jpeg" alt="building"/>
          <p>
            This is a platform meant for apartment neighbors to democratically
            administer their community. Sign up to participate or log in if
            you're already a member.
          </p>
        </div>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-signup">
            Sign Up
          </Link>
          <Link to="/login" className="cta-login">
            Log In
          </Link>
        </div>
      </main>

      <footer className="homepage-footer">
        <p>&copy; 2023 Apartment Admin. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
