import React, { useState, useEffect, useContext } from "react";
import "./DashboardPage.css";
import { AuthContext } from "../../context/auth.context";
import AnnouncementService from "../../services/announcements.service";
import PollService from "../../services/polls.service";
import BuildingService from "../../services/building.service";
import UserService from "../../services/users.service";
import { useLocation } from "react-router-dom";

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [polls, setPolls] = useState([]);
  const [hasBuilding, setHasBuilding] = useState(false);
  const [buildingAddress, setBuildingAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation;
  const passedBuildingId = location.state?.newBuildingId;

  useEffect(() => {
    const currentBuildingId = passedBuildingId || user.residence?.building;

    if (currentBuildingId) {
      setHasBuilding(true);

      AnnouncementService.getAnnouncementsByBuilding(currentBuildingId)
        .then((data) => {
          setAnnouncements(data);
        })
        .catch((error) => {
          console.error("Error fetching announcements:", error);
        });

      PollService.getPollsByBuilding(currentBuildingId)
        .then((data) => {
          setPolls(data);
        })
        .catch((error) => {
          console.error("Error fetching polls:", error);
        });
    }
  }, [passedBuildingId, user]);

  const handleJoinBuilding = (buildingId) => {
    BuildingService.addUserToBuilding(buildingId, user._id)
      .then(() => {
        return UserService.updateUserBuilding(user._id, buildingId);
      })
      .then(() => {
        setHasBuilding(true);
      })
      .catch((error) => {
        console.error("Error updating associations:", error);
      });
  };

  const handleAddressSearch = () => {
    BuildingService.getBuildingByAddress(buildingAddress)
      .then((buildingResponse) => {
        const wantsToJoin = window.confirm(
          "A building with this address exists. Do you want to join it?"
        );
        if (wantsToJoin) {
          console.log(buildingResponse);
          handleJoinBuilding(buildingResponse.data._id);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage("No building found with the given address.");
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">Welcome, {user.name}!</div>
      {hasBuilding ? (
        <div className="dashboard-content">
          <section className="recent-announcements">
            <h2>Recent Announcements</h2>
            {/* Display announcements */}
            {announcements.map((announcement) => (
              <div key={announcement.id}>{announcement.title}</div>
            ))}
            <a href="/announcements">see all</a>
          </section>
          <section className="ongoing-polls">
            <h2>Ongoing Polls</h2>
            {/* Display polls */}
            {polls.map((poll) => (
              <div key={poll.id}>{poll.title}</div>
            ))}
            <a href="/polls">see all</a>
          </section>
        </div>
      ) : (
        <div className="no-building-notice">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          You're not associated with any building.
          <div>
            Search for a building to join:
            <input
              type="text"
              value={buildingAddress}
              onChange={(e) => setBuildingAddress(e.target.value)}
            />
            <button onClick={handleAddressSearch}>Search</button>
          </div>
          <div>
            or <a href="/create-building">create a new one</a>.
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
