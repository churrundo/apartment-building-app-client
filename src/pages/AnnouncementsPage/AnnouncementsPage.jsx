import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Spinner, Col } from "react-bootstrap";
import "./AnnouncementsPage.css";
import { AuthContext } from "../../context/auth.context";
import announcementService from "../../services/announcements.service";
import AnnouncementCard from "./AnnouncementCard/AnnouncementCard";

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      title,
      message,
      userId: user._id,
      buildingId: user.buildingId,
    };

    try {
      await announcementService.createAnnouncement(formData);
      fetchAnnouncements();
      handleClose();
    } catch (error) {
      console.error("Error while creating announcement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="announcements">
      <h1>Latest Announcements</h1>
      <div className="announcement-list">
        <Button onClick={handleShow} className="mb-10">
          Create New Announcement
        </Button>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                className="mb-3"
              />

              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement message here"
                className="mb-3"
              />

              <Button type="submit" disabled={isLoading} block>
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Col md={6} key={announcement._id}>
              <AnnouncementCard
                announcement={announcement}
                refreshData={fetchAnnouncements}
              />
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
