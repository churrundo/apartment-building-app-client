import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import AnnouncementService from "../../services/announcements.service";
import PollService from "../../services/polls.service";
import BuildingService from "../../services/building.service";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  ListGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [polls, setPolls] = useState([]);
  const [hasBuilding, setHasBuilding] = useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [announcementError, setAnnouncementError] = useState(null);
  const [pollsError, setPollsError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, storeToken, authenticateUser } = useContext(AuthContext);

  console.log("context.user.buildingID:", user.buildingId);

  useEffect(() => {
    const currentBuildingId = user.buildingId;
    if (currentBuildingId) {
      setHasBuilding(true);

      AnnouncementService.getAnnouncementsByBuilding(currentBuildingId)
        .then((response) => {
          response.data
            ? setAnnouncements(response.data)
            : setAnnouncementError("No announcements found for this building.");
        })
        .catch((error) => {
          console.log(error.message);
        });

      PollService.getPollsByBuilding(currentBuildingId)
        .then((response) => {
          response.data
            ? setPolls(response.data)
            : setPollsError("No polls found for this building.");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user]);

  const handleJoinBuilding = (buildingId) => {
    console.log(`Adding user ${user._id} to building ${buildingId}`);
    BuildingService.addUserToBuilding(buildingId, user._id)
      .then((response) => {
        console.log("response data:", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Container fluid className="mt-4">
      <h3 className="mb-4">Welcome, {user.name}!</h3>
      {hasBuilding && <p className="text-muted">Building ID: {user.buildingId}</p>}
      {hasBuilding ? (
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Recent Announcements</Card.Header>
              <Card.Body>
                {announcementError ? (
                  <div className="error-message">{announcementError}</div>
                ) : (
                  <>
                    <ListGroup variant="flush">
                      {announcements.map((announcement) => (
                        <ListGroup.Item key={announcement._id}>
                          {announcement.title}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <Button variant="link" as={Link} to="/announcements">
                      See all
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Header>Ongoing Polls</Card.Header>
              <Card.Body>
                {pollsError ? (
                  <div className="error-message">{pollsError}</div>
                ) : (
                  <>
                    <ListGroup variant="flush">
                      {polls.map((polls) => (
                        <ListGroup.Item key={polls._id}>
                          {polls.title}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <Button variant="link" as={Link} to="/polls">
                      See all
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Card className="mx-auto mt-5" style={{ maxWidth: "600px" }}>
          <Card.Body className="text-center">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Card.Text>You're not associated with any building.</Card.Text>

            <div className="d-flex mb-3">
              <FormControl
                type="text"
                placeholder="Enter Building ID"
                value={buildingId}
                onChange={(e) => setBuildingId(e.target.value)}
                className="mr-2"
              />
              <Button onClick={() => handleJoinBuilding(buildingId)}>
                Join
              </Button>
            </div>

            <Card.Text>
              or{" "}
              <Button variant="link" as={Link} to="/create-building">
                create a new one
              </Button>
              .
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default DashboardPage;
