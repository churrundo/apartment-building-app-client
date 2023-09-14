import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./PollsPage.css";
import pollService from "../../services/polls.service";
import { AuthContext } from "../../context/auth.context";
import PollCard from "../../components/PollCard/PollCard";

function PollsPage() {
  const [polls, setPolls] = useState([]);
  const {user} = useContext(AuthContext)

  function handlePollDeletion(deletedPollId) {
    const updatedPolls = polls.filter(poll => poll._id !== deletedPollId);
    setPolls(updatedPolls);
  }

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await pollService.getPollsByBuilding(user.buildingId);
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, [user]);

  return (
    <div className="polls">
      <h1>Ongoing Polls</h1>
      <div className="poll-list">
        {polls.map((poll) => (
          <PollCard key={poll._id} poll={poll} onDelete={handlePollDeletion} />
        ))}
      </div>
      <Link to='/new-poll'>Open new poll...</Link>
    </div>
  );
}

export default PollsPage;
