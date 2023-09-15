import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../../context/auth.context";
import announcementService from "../../../services/announcements.service";

function NewAnnouncementForm({ show, onNewAnnouncement, handleClose }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const announcementData = {
      title,
      message,
      userId: user._id,
      buildingId: user.buildingId,
    };
    try {
      await announcementService.createAnnouncement(announcementData);       
      onNewAnnouncement();
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Announcement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
          <Button className = "mt-4" variant="primary" type="submit">
            Create Announcement
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewAnnouncementForm;