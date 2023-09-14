import React, { useContext, useEffect, useState } from "react";
import "./AnnouncementCard.css";
import { AuthContext } from "../../../context/auth.context";
import announcementService from "../../../services/announcements.service";
import userService from "../../../services/users.service";

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
        refreshData()
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
    });  };

  return (
    <div key={announcement._id} className="announcement-card">
      <h3>
        {isEditMode ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          announcement.title
        )}
      </h3>
      <div className="announcement">
        <p>
          {isEditMode ? (
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
            />
          ) : (
            announcement.message
          )}
        </p>
        <span>
          Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
        </span>
      </div>
      <span>By: {createdBy}</span>
      {user && user._id === announcement.userId && (
        <div className="announcement-actions">
          {isEditMode ? (
            <>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => handleEdit()}>Cancel</button>
            </>
          ) : (
            <button onClick={() => handleEdit()}>Edit</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default AnnouncementCard;
