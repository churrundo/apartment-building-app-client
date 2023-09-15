import { useState, useEffect, useContext } from "react";
import { Button, Col } from "react-bootstrap";
import "./AnnouncementsPage.css";
import { AuthContext } from "../../context/auth.context";
import announcementService from "../../services/announcements.service";
import AnnouncementCard from "./AnnouncementCard/AnnouncementCard";
import NewAnnouncementForm from "./NewAnnouncementForm/NewAnnouncementForm";

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { user } = useContext(AuthContext);

  const fetchAnnouncements = () => {
    announcementService
      .getAnnouncementsByBuilding(user.buildingId)
      .then((data) => {
        if (data.message === "No announcements found") {
          console.log(data.message);
        }
        setAnnouncements(data.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  };

  const handleNewAnnouncement = () => {
    fetchAnnouncements();
    handleClose();
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="announcements">
      <h1>Latest Announcements</h1>

      <Button onClick={handleShow} className="mb-10">
        Create New Announcement
      </Button>
      <div className="announcement-list">
        <NewAnnouncementForm
          show={showModal}
          handleClose={handleClose}
          onNewAnnouncement={handleNewAnnouncement}
        />
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Col md={6} key={announcement._id}>
              <AnnouncementCard announcement={announcement} onDelete = {fetchAnnouncements}/>
            </Col>
          ))
        ) : (
          <div className="announcements-feed">
            <p>Nothing to show!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementsPage;
