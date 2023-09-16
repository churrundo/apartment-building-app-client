import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import buildingService from "../../../services/building.service";
import { Form, Button, Container, Alert } from "react-bootstrap";

function NewBuildingPage() {
  const [buildingAddress, setBuildingAddress] = useState("");
  const [totalApartments, setTotalApartments] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user, storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleBuildingSubmit = async (e) => {
    e.preventDefault();
  
    const buildingData = {
      address: buildingAddress,
      totalApartments,
      admin: user._id,
    };
  
    try {
      const response = await buildingService.createBuilding(buildingData);
      const newBuildingId = response.data.building._id;  
      const userResponse = await buildingService.addUserToBuilding(newBuildingId, user._id);
      console.log("response data:", userResponse.data.authToken);
      storeToken(userResponse.data.authToken);
      authenticateUser();
      navigate("/dashboard", {state: {buildingId: newBuildingId}});     
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
    }
  };  

  return (
    <Container className="my-4">
      <h2 className="mb-4">Create New Building</h2>
      <p className="text-muted">(you'll be logged out. just log back in)</p>
      <Form onSubmit={handleBuildingSubmit}>
        <Form.Group>
          <Form.Label>Building Address:</Form.Label>
          <Form.Control
            type="text"
            value={buildingAddress}
            onChange={(e) => setBuildingAddress(e.target.value)}
            placeholder="Enter Building Address"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Total Apartments:</Form.Label>
          <Form.Control
            type="number"
            value={totalApartments}
            onChange={(e) => setTotalApartments(e.target.value)}
            placeholder="Enter Total Apartments"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Building
        </Button>
      </Form>
      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
}

export default NewBuildingPage;
