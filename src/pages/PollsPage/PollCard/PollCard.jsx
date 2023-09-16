import React, { useState, useContext } from "react";
import pollService from "../../../services/polls.service";
import { AuthContext } from "../../../context/auth.context";
import { Button, Card, ProgressBar } from "react-bootstrap";
import "./PollCard.css";

function PollCard({ poll }) {
  const [currentPoll, setCurrentPoll] = useState(poll);
  const [voteAcknowledged, setVoteAcknowledged] = useState(false);
  // eslint-disable-next-line
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

  return (
    <Card className="mb-3" md={6} lg={4} xl={3}>
      <Card.Header>
        <h2>{currentPoll.title}</h2>
      </Card.Header>
      <Card.Body>
        <Card.Text>{currentPoll.description}</Card.Text>
        {voteAcknowledged && (
          <div className="alert alert-success">Thanks for voting!</div>
        )}

        {currentPoll.options.map((option) => (
          <div key={option._id}>
            <Card.Text>
              {option.optionText} -
              {totalVotes === 0
                ? "0.00"
                : ((option.votes / totalVotes) * 100).toFixed(2)}
              %
            </Card.Text>
            <ProgressBar
              now={
                totalVotes === 0
                  ? "0.00"
                  : ((option.votes / totalVotes) * 100).toFixed(2)
              }
              label={
                totalVotes === 0
                  ? "0.00"
                  : `${((option.votes / totalVotes) * 100).toFixed(2)}%`
              }
            />
            {currentPoll.status === "Open" && (
              <Button
                variant="primary"
                size="sm"
                className="mt-2"
                onClick={() => handleVote(option._id)}
                disabled={userHasVoted}
              >
                Vote
              </Button>
            )}
            {currentPoll.status === "Closed" && (
              <span className="text-muted">Closed</span>
            )}
          </div>
        ))}
      </Card.Body>
      {currentPoll.createdBy === user._id && currentPoll.status === "Open" && (
        <Card.Footer>
          <Button
            variant="danger"
            onClick={() => handleClosePoll(currentPoll._id)}
          >
            Close Poll
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}

export default PollCard;
