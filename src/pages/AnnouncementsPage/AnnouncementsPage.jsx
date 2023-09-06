import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AnnouncementsPage.css";
import announcementService from "../../services/announcements.service";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = ()=>{
    announcementService
      .getAllAnnouncements()
      .then((data) => {
        if (data.message === "No announcements found") {
          console.log(data.message);
        }
        setAnnouncements(data.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }

  useEffect(() => {
    fetchAnnouncements()
  }, []);

  return (
    <div className="announcements">
      <h1>Latest Announcements</h1>
      <div className="announcement-list">
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement._id}
              announcement={announcement}
              refreshData={fetchAnnouncements}
            />
          ))
        ) : (
          <div className="announcements-feed">
            <p>Nothing to show!</p>
          </div>
        )}
        <Link to="/new-announcement">Create new announcement...</Link>
      </div>
    </div>
  );
}

export default AnnouncementsPage;
