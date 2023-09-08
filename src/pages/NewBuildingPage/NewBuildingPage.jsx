import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import buildingService from "../../services/building.service";

function NewBuildingPage() {
  const [buildingName, setBuildingName] = useState("");
  const [totalApartments, setTotalApartments] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const location = useLocation();
  const navigate = useNavigate();

  // Extract building address from the router's state
  const buildingAddress = location.state?.buildingAddress || "";

  useEffect(() => {
    if (!buildingAddress) {
      // If no address provided, navigate to an appropriate page or show error
      setErrorMessage("No building address provided.");
    }
  }, [buildingAddress]);

  const handleBuildingSubmit = (e) => {
    e.preventDefault();

    const buildingData = {
      name: buildingName,
      address: buildingAddress,
      totalApartments
    };

    buildingService.createBuilding(buildingData)
      .then(() => {
        navigate("/some-success-page-or-dashboard");
      })
      .catch(error => {
        setErrorMessage(error.message || "An error occurred.");
      });
  };

  return (
    <div>
      <h2>Create New Building</h2>
      <form onSubmit={handleBuildingSubmit}>
        <label>Building Address:</label>
        <input type="text" value={buildingAddress} readOnly />

        <label>Building Name:</label>
        <input 
          type="text" 
          value={buildingName} 
          onChange={(e) => setBuildingName(e.target.value)} 
        />

        <label>Total Apartments:</label>
        <input 
          type="number" 
          value={totalApartments} 
          onChange={(e) => setTotalApartments(e.target.value)} 
        />

        <button type="submit">Create Building</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default NewBuildingPage;
