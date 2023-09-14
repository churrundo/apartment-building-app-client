import "./SignupPage.css";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        } else {
          setErrorMessage(error.message);
        }
      });
  };

return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Sign Up</h1>

      <Form onSubmit={handleSignupSubmit} className="w-100" style={{ maxWidth: '380px' }}>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={email} onChange={handleEmail} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" value={password} onChange={handlePassword} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={name} onChange={handleName} />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">Sign Up</Button>
      </Form>

      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

      <p className="mt-3">Already have an account?</p>
      <Link to={"/login"}> Login</Link>
    </Container>
);
}

export default SignupPage;
