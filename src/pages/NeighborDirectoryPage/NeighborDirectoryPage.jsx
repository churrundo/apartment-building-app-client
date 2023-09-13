import React, { useState, useEffect, useContext } from "react";
import "./NeighborDirectoryPage.css";
import { AuthContext } from "../../context/auth.context";
import buildingService from "../../services/building.service";
import NeighborCard from "../../components/NeighborCard/NeighborCard";

const NeighborDirectoryPage = () => {
  const [neighbors, setNeighbors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [filterValue, setFilterValue] = useState("all");
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
    <div className="neighbor-directory">
      <h1>Neighbor Directory</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, apartment, or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="occupation">Occupation</option>
          <option value="language">Language</option>
          <option value="skill">Skill</option>
        </select>
        {filter !== "all" && (
          <input
            type="text"
            placeholder={`Filter by ${filter}...`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
      </div>

      <div className="neighbor-list">
        {neighbors.length === 0 ? (
          <div className="empty-message">
            <p>No neighbors' information is available.</p>
            <p>Invite them to join the platform and share their details!</p>
          </div>
        ) : (
          filteredNeighbors.map((neighbor) => (
            <NeighborCard key={neighbor._id} neighbor={neighbor} />
          ))
        )}
      </div>
    </div>
  );
};

export default NeighborDirectoryPage;
