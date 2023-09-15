import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./NeighborDirectoryPage.css";
import { AuthContext } from "../../context/auth.context";
import buildingService from "../../services/building.service";
import NeighborCard from "./NeighborCard/NeighborCard";

const NeighborDirectoryPage = () => {
  const [neighbors, setNeighbors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [filterValue, setFilterValue] = useState("all");
  const [expandedNeighborId, setExpandedNeighborId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    buildingService
      .getResidents(user.buildingId)
      .then((response) => {
        setNeighbors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching neighbors:", error);
      });
  }, [user]);

  const filteredNeighbors = neighbors.filter((neighbor) => {
    const matchesSearch =
      neighbor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      neighbor.details.specialSkills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    let matchesFilter = true;
    if (filter === "occupation") {
      matchesFilter = neighbor.details.occupation
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    } else if (filter === "language") {
      matchesFilter = neighbor.details.languagesSpoken.includes(
        filterValue.toLowerCase()
      );
    } else if (filter === "skill") {
      matchesFilter = neighbor.details.specialSkills.includes(
        filterValue.toLowerCase()
      );
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <Container fluid className="neighbor-directory h-100">
      <h1>Neighbor Directory</h1>

      <Row className="mb-3 justify-content-center">
        <Col md={6}>
          <div className="search-wrapper">
            <i className="fas fa-search search-icon"></i>
            <Form.Control
              type="text"
              className="search-input"
              placeholder="Search by name, apartment, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Col>
        <Col md={3}>
          <Form.Control
            as="select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="occupation">Occupation</option>
            <option value="language">Language</option>
            <option value="skill">Skill</option>
          </Form.Control>
        </Col>
        <Col md={3}>
          {filter !== "all" && (
            <Form.Control
              type="text"
              placeholder={`Filter by ${filter}...`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}
        </Col>
      </Row>

      <div className="neighbor-list">
        {neighbors.length === 0 ? (
          <div className="empty-message">
            <p>No neighbors' information is available.</p>
            <p>Invite them to join the platform with your Building ID!</p>
          </div>
        ) : (
          filteredNeighbors.map((neighbor) => (
            <NeighborCard
              neighbor = {neighbor}
              isExpanded={expandedNeighborId === neighbor._id}
              onExpand={() => setExpandedNeighborId(neighbor._id)}
              onCollapse={() => setExpandedNeighborId(null)}
            />
          ))
        )}
      </div>
    </Container>
  );
};

export default NeighborDirectoryPage;
