import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import announcementService from "../../services/announcements.service";
import "./NewAnnouncementForm.css";

function NewAnnouncementForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      title,
      message,
      userId,
    };

    console.log(formData);
    try {
      await announcementService.createAnnouncement(formData);

      navigate("/announcements");
    } catch (error) {
      console.error("Error while creating announcement:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Create New Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Message: </label>
          <textarea
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default NewAnnouncementForm;
