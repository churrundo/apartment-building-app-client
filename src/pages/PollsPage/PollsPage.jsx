import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import pollService from "../../services/polls.service";
import { AuthContext } from "../../context/auth.context";
import PollCard from "./PollCard/PollCard";
import NewPollForm from "./NewPollForm/NewPollForm";

function PollsPage() {
  const [polls, setPolls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchPolls = async () => {
    try {
      const response = await pollService.getPollsByBuilding(user.buildingId);
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  useEffect(() => {
    fetchPolls();
    // eslint-disable-next-line
  }, [user]);

  return (
    <Container fluid className="mt-4">
      <Row className="mb-3">
        <Col>
          <h1>All Polls</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={() => setShowModal(true)}>Open new poll...</Button>
          <NewPollForm
            show={showModal}
            handleClose={() => setShowModal(false)}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {polls.map((poll) => (
          <Col md={6} lg={4} xl={4} key={poll._id} >
            <PollCard poll={poll} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PollsPage;
