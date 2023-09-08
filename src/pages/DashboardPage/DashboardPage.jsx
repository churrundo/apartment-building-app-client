import React, { useState, useEffect, useContext } from "react";
import "./DashboardPage.css";
import { AuthContext } from "../../context/auth.context";
import AnnouncementService from "../../services/announcements.service";
import PollService from "../../services/polls.service";

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [polls, setPolls] = useState([]);
  const [hasBuilding, setHasBuilding] = useState(false);

  useEffect(() => {
    if (user.buildingId) {
      setHasBuilding(true);

      // Fetch announcements based on user's building
      AnnouncementService.getAnnouncementsByBuilding(user.buildingId)
        .then((data) => {
          setAnnouncements(data);
        })
        .catch((error) => {
          console.error("Error fetching announcements:", error);
        });

      // Fetch polls based on user's building
      PollService.getPollsByBuilding(user.buildingId)
        .then((data) => {
          setPolls(data);
        })
        .catch((error) => {
          console.error("Error fetching polls:", error);
        });
    }
  }, [user]);

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
          You're not associated with any building.{" "}
          <a href="/join-building">Join an existing building</a> or{" "}
          <a href="/create-building">create a new one</a>.
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
