import { useState, useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import buildingService from "../../../services/building.service";
import userService from "../../../services/users.service";

function NewBuildingPage() {
  const [buildingAddress, setBuildingAddress] = useState("");
  const [totalApartments, setTotalApartments] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user, logOutUser } = useContext(AuthContext);

  const handleBuildingSubmit = (e) => {
    e.preventDefault();

    const buildingData = {
      address: buildingAddress,
      totalApartments,
      admin: user._id,
    };

    buildingService
      .createBuilding(buildingData)
      .then((response) => {
        const newBuildingId = response.data.building._id;
        userService
          .updateUser(user._id, {
            residence: { building: newBuildingId },
          })
          .then(() => {
            logOutUser()
          });
      })
      .catch((error) => {
        setErrorMessage(error.message || "An error occurred.");
      });
  };

  return (
    <div>
      <h2>Create New Building (you'll be logged out. just log back in)</h2>
      <form onSubmit={handleBuildingSubmit}>
        <label>Building Address:</label>
        <input
          type="text"
          value={buildingAddress}
          onChange={(e) => setBuildingAddress(e.target.value)}
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
