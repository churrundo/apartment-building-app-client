import React, { useState, useEffect, useContext } from "react";
import "./DashboardPage.css";
import { AuthContext } from "../../context/auth.context";
import AnnouncementService from "../../services/announcements.service";
import PollService from "../../services/polls.service";
import BuildingService from "../../services/building.service";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [polls, setPolls] = useState([]);
  const [hasBuilding, setHasBuilding] = useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [announcementError, setAnnouncementError] = useState(null);
  const [pollsError, setPollsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //get the building id form jwt
  const { user } = useContext(AuthContext);
  console.log("context.user.buildingID:", user.buildingId);

  useEffect(() => {
    const currentBuildingId = user.buildingId;
    if (currentBuildingId) {
      setHasBuilding(true);

      AnnouncementService.getAnnouncementsByBuilding(currentBuildingId)
        .then((response) => {
          response.data
            ? setAnnouncements(response.data)
            : setAnnouncementError("No announcements found for this building.");
        })
        .catch((error) => {
          console.log(error.message);
        });

      PollService.getPollsByBuilding(currentBuildingId)
        .then((response) => {
          response.data
            ? setPolls(response.data)
            : setPollsError("No polls found for this building.");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user]);

  const handleJoinBuilding = (buildingId) => {
    console.log(`Adding user ${user._id} to building ${buildingId}`);
    BuildingService.addUserToBuilding(buildingId, user._id)
      .then(() => {
        AuthContext.logOutUser();
      })
      .catch((error) => {
        setErrorMessage(error.message)
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">Welcome, {user.name}!</div>
      {hasBuilding ? (
        <div className="dashboard-content">
          <section className="recent-announcements">
            <h2>Recent Announcements</h2>
            <a href="/new-announcement">Post an announcement</a>
            {announcementError ? (
              <div className="error-message">{announcementError}</div>
            ) : (
              <>
                {announcements.map((announcement) => (
                  <div className="dashboard-item" key={announcement._id}>
                    {announcement.title}
                  </div>
                ))}
                <a href="/announcements">see all</a>
              </>
            )}
          </section>

          <section className="ongoing-polls">
            <h2>Ongoing Polls</h2>
            <a href="/new-poll">Open a poll</a>
            {pollsError ? (
              <div className="error-message">{pollsError}</div>
            ) : (
              <>
                {polls.map((poll) => (
                  <div className="dashboard-item" key={poll._id}>
                    {poll.title}
                  </div>
                ))}
                <a href="/polls">see all</a>
              </>
            )}
          </section>
          <div className="directory-link">
            <Link to="/directory">Go to Neighbor Directory</Link>
          </div>
        </div>
      ) : (
        <div className="no-building-notice">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          You're not associated with any building.
          <div>
            Enter a Building ID to join:
            <input
              type="text"
              placeholder="Enter Building ID"
              value={buildingId}
              onChange={(e) => setBuildingId(e.target.value)}
            />
            <button onClick={()=>{handleJoinBuilding(buildingId)}}>Join</button>
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
