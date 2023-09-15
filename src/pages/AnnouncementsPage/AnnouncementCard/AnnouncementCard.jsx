import React, { useContext, useEffect, useState } from "react";
import "./AnnouncementCard.css";
import { AuthContext } from "../../../context/auth.context";
import announcementService from "../../../services/announcements.service";
import userService from "../../../services/users.service";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";

function AnnouncementCard({ announcement, refreshData }) {
  const { user } = useContext(AuthContext);
  const [createdBy, setCreatedBy] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(announcement.title);
  const [editedMessage, setEditedMessage] = useState(announcement.message);

  useEffect(() => {
    userService
      .getUser(announcement.userId)
      .then((response) => {
        setCreatedBy(response.data.name);
      })
      .catch((error) => {
        console.error("There was an error fetching the user name", error);
      });
  }, [announcement.userId]);

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleUpdate = () => {
    announcementService
      .updateAnnouncement(announcement._id, {
        title: editedTitle,
        message: editedMessage,
      })
      .then(() => {
        setIsEditMode(false);
        refreshData();
      })
      .catch((error) => {
        console.error("There was an error updating the announcement", error);
      });
  };

  const handleDelete = () => {
    announcementService
      .deleteAnnouncement(announcement._id)
      .then(() => {
        refreshData();
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
      });
  };

  return (
    <Card className="mb-3">
      <Card.Header>
        {isEditMode ? (
          <InputGroup>
            <FormControl
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </InputGroup>
        ) : (
          announcement.title
        )}
      </Card.Header>

      <Card.Body>
        {isEditMode ? (
          <FormControl
            as="textarea"
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
          />
        ) : (
          <Card.Text>{announcement.message}</Card.Text>
        )}
        <Card.Subtitle className="mt-2 text-muted">
          Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
        </Card.Subtitle>
      </Card.Body>

      <Card.Footer>
        <small className="text-muted">By: {createdBy}</small>
        {user && user._id === announcement.userId && (
          <div className="float-right">
            {isEditMode ? (
              <>
                <Button
                  variant="success"
                  onClick={handleUpdate}
                  className="mr-2"
                >
                  Update
                </Button>
                <Button variant="secondary" onClick={() => handleEdit()}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => handleEdit()} className="mr-2">
                Edit
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </Card.Footer>
    </Card>
  );
}

export default AnnouncementCard;
