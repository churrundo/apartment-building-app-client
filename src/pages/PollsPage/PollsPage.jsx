import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PollsPage.css";
import pollService from "../../services/polls.service";

import PollCard from "../../components/PollCard/PollCard";

function PollsPage() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await pollService.getAllPolls();
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="polls">
      <h1>Ongoing Polls</h1>
      <div className="poll-list">
        {polls.map((poll) => (
          <PollCard key={poll._id} poll={poll} />
        ))}
      </div>
      <Link to='/new-poll'>Open new poll...</Link>
    </div>
  );
}

export default PollsPage;
