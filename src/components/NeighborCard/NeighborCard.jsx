import React, { useState } from 'react';

const NeighborCard = ({ neighbor }) => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="neighbor-card" onClick={() => setIsExpanded(!isExpanded)}>
      <h2>{neighbor.name}</h2>
      <p>Phone: {neighbor.details.contactNumber}</p>
      <p>Apt: {neighbor.residence.apartmentNumber}</p>

      {isExpanded && (
        <>
          <p>{neighbor.details.occupation}</p>
          <p>Bio: {neighbor.details.shortBio}</p>
          <div className="skills">
            {neighbor.details.specialSkills.map((skill) => (
              <span className="skill-tag" key={skill}>
                {skill}
              </span>
            ))}
          </div>
          {/* ... other neighbor details ... */}
        </>
      )}
    </div>
  );
};

export default NeighborCard;
