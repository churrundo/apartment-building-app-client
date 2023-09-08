import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import buildingService from "../../services/building.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [buildingName, setBuildingName] = useState("");
  const [buildingAddress, setBuildingAddress] = useState("");
  const [totalApartments, setTotalApartments] = useState("");

  const [isNewBuilding, setIsNewBuilding] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleBuildingName = (e) => setBuildingName(e.target.value);
  const handleBuildingAddress = (e) => setBuildingAddress(e.target.value);
  const handleTotalApartments = (e) => setTotalApartments(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const userRequestBody = { email, password, name };
    const buildingRequestBody = {
      name: buildingName,
      address: buildingAddress,
      totalApartments,
    };
    authService
      .signup(userRequestBody)
      .then((response) => {
        if(isNewBuilding) {
          // API call to create the building
          buildingService.create(buildingRequestBody)
            .then((buildingResponse) => {
              navigate("/login");
            })
            .catch((buildingError) => {
              // Handle building creation errors
              setErrorMessage(buildingError.message);
            });
        } else {
          navigate("/login");
        }
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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Building Address:</label>
        <input
          type="text"
          name="buildingAddress"
          value={buildingAddress}
          onChange={handleBuildingAddress}
        />
        {isNewBuilding && (
          <>
            <label>Building Name:</label>
            <input
              type="text"
              name="buildingName"
              value={buildingName}
              onChange={handleBuildingName}
            />

            <label>Total Apartments:</label>
            <input
              type="number"
              name="totalApartments"
              value={totalApartments}
              onChange={handleTotalApartments}
            />
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
