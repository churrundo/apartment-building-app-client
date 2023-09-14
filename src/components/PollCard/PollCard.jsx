import React, { useState, useContext } from "react";
import pollService from "../../services/polls.service";
import { AuthContext } from "../../context/auth.context";
import "./PollCard.css";

function PollCard({ poll, onDelete }) {
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

  const handleClosePoll = async (pollId) => {
    try {
      const userId = user._id;
      await pollService.closePoll(pollId, userId);

      const updatedPoll = { ...currentPoll, status: "Closed" };
      setCurrentPoll(updatedPoll);
    } catch (error) {
      console.error("Error closing poll:", error);
    }
  };

  const handleDeletePoll = async () => {
    try {
      const response = await pollService.deletePoll(currentPoll._id, user._id);
      if (response) {
        console.log("Poll deleted successfully!");
        if (onDelete) {
          onDelete(currentPoll._id);
        }
      }
    } catch (error) {
      console.error("Error deleting poll:", error);
    }
  };

  const getWinningOptionId = () => {
    let maxVotes = -1;
    let winningOptionId = null;

    currentPoll.options.forEach(option => {
      if (option.votes > maxVotes) {
        maxVotes = option.votes;
        winningOptionId = option._id;
      }
    });

    return winningOptionId;
  };

  const winningOptionId = getWinningOptionId();

  return (
    <div className="poll-card">
      <h2>{currentPoll.title}</h2>
      <p>{currentPoll.description}</p>

      <div className="options-container">
        {currentPoll.options.map((option) => (
          <div
            key={option._id}
            className={`option ${option._id === winningOptionId && currentPoll.status === "Closed" ? 'winning-option' : ''}`}
          >
            <span>{option.optionText}</span>
            <span>
              {totalVotes === 0
                ? "0.00%"
                : ((option.votes / totalVotes) * 100).toFixed(2)}
              %
            </span>
            {currentPoll.status === "Open" ? (
              <button onClick={() => handleVote(option._id)}>Vote</button>
            ) : (
              <span>Closed</span>
            )}
          </div>
        ))}
      </div>
      {currentPoll.createdBy === user._id && (
        <>
          {currentPoll.status === "Open" ? (
            <button onClick={() => handleClosePoll(currentPoll._id)}>
              Close Poll
            </button>
          ) : (
            <button onClick={handleDeletePoll}>
              Delete Poll
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PollCard;
