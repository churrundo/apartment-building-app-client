import React, { useState, useContext } from "react";
import pollService from "../../services/polls.service";
import { AuthContext } from "../../context/auth.context";
import "./PollCard.css";

function PollCard({ poll }) {
  const [currentPoll, setCurrentPoll] = useState(poll);
  const { user } = useContext(AuthContext);

  
  const totalVotes = currentPoll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  const handleVote = async (optionId) => {
    try {
      const userId = user._id;
      console.log(userId);
      const response = await pollService.vote(poll._id, optionId, userId);

      // Check if the response has the needed properties.
      if (response && response.data.options) {
        setCurrentPoll(response.data);
      } else {
        console.error(
          "Received unexpected poll structure from server:",
          response
        );
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="poll-card">
      <h2>{currentPoll.title}</h2>
      <p>{currentPoll.description}</p>
      <div className="options-container">
        {currentPoll.options.map((option) => (
          <div key={option._id} className="option">
            <span>{option.optionText}</span>
            <span>
              {totalVotes === 0
                ? "0.00%"
                : ((option.votes / totalVotes) * 100).toFixed(2)}
              %
            </span>
            <button onClick={() => handleVote(option._id)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PollCard;
