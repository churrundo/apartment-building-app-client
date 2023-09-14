import React, { useState, useContext } from "react";
import pollService from "../../services/polls.service";
import { AuthContext } from "../../context/auth.context";
import "./PollCard.css";

function PollCard({ poll }) {
  const [currentPoll, setCurrentPoll] = useState(poll);
  const [voteAcknowledged, setVoteAcknowledged] = useState(false);
  const [votedOption, setVotedOption] = useState(null);
  const { user } = useContext(AuthContext);

  const totalVotes = currentPoll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  const userHasVoted = currentPoll.votedUserIds.includes(user._id);

  const handleVote = async (optionId) => {
    try {
      const userId = user._id;
      const response = await pollService.vote(poll._id, optionId, userId);
      setVotedOption(optionId);
      if (response && response.data.options) {
        setCurrentPoll(response.data);
        setVoteAcknowledged(true);
        setTimeout(() => setVoteAcknowledged(false), 3000);
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

  const getWinningOptionId = () => {
    let maxVotes = -1;
    let winningOptionId = null;

    currentPoll.options.forEach((option) => {
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
      {voteAcknowledged && (
        <div className="vote-acknowledgement">Thanks for voting!</div>
      )}
  
      <div className="options-container">
        {currentPoll.options.map((option) => (
          <div
            key={option._id}
            className={`option 
            ${option._id === winningOptionId && currentPoll.status === "Closed"
              ? "winning-option"
              : ""} 
            ${userHasVoted && option._id === votedOption ? "option-voted" : ""}`}
          >
            <span>{option.optionText}</span>
            <span>
              {totalVotes === 0
                ? "0.00%"
                : ((option.votes / totalVotes) * 100).toFixed(2)}
              %
            </span>
            {currentPoll.status === "Open" ? (
              <button
                onClick={() => handleVote(option._id)}
                disabled={userHasVoted}
              >
                Vote
              </button>
            ) : (
              <span>Closed</span>
            )}
          </div>
        ))}
      </div>
      {currentPoll.createdBy === user._id && currentPoll.status === "Open" && (
        <button onClick={() => handleClosePoll(currentPoll._id)}>
          Close Poll
        </button>
      )}
    </div>
  );
  
}

export default PollCard;
