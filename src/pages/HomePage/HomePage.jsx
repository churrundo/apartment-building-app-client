import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
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
    <Container fluid className="d-flex flex-column vh-100 px-0">
      <Row className="m-auto text-center justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h2>Apartment Admin</h2>
          <div className="hero">
            <img
              src="./landing-page-icon.jpeg"
              alt="building"
              className="img-fluid hero-image mb-4"
            />
            <p>
              This is a platform meant for apartment neighbors to democratically
              administer their community. Sign up to participate or log in if
              you're already a member.
            </p>
            <div className="d-flex min-w-300">
              <Button
                variant="success"
                as={Link}
                to="/signup"
                className="cta-signup mr-8"
              >
                Sign Up
              </Button>
              <Button
                variant="dark"
                as={Link}
                to="/login"
                className="cta-login"
              >
                Log In
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <footer className="homepage-footer w-100 text-center mt-auto">
        <p>&copy; 2023 Apartment Admin. All rights reserved.</p>
      </footer>
    </Container>
  );
}

export default HomePage;
