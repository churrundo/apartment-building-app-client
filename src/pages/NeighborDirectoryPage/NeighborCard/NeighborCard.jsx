const NeighborCard = ({ neighbor, isExpanded, onExpand, onCollapse }) => {
  return (
    <div
      className="neighbor-card"
      onClick={() => {
        if (isExpanded) {
          onCollapse();
        } else {
          onExpand();
        }
      }}
    >
      <h2>{neighbor.name}</h2>
      <p>Phone: {neighbor.details.contactNumber}</p>
      <p>Apt: {neighbor.residence.apartmentNumber}</p>

      {isExpanded && (
        <div
          onClick={() => {
            if (isExpanded) {
              onCollapse();
            } else {
              onExpand();
            }
          }}
          className="expanded-content"
        >
          <section>
            <h6>Occupation</h6>
            <p>{neighbor.details.occupation}</p>
          </section>

          <section>
            <h6>Bio</h6>
            <p>{neighbor.details.shortBio}</p>
          </section>

          <section>
            <h6>Skills</h6>
            <div className="skills">
              {neighbor.details.specialSkills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h6>Emergency Contact</h6>
            <p>Name: {neighbor.details.emergencyContact.name}</p>
            <p>Phone: {neighbor.details.emergencyContact.phone}</p>
          </section>

          {neighbor.details.vehicleDetails.type && (
            <section>
              <h6>Vehicle Details</h6>
              <p>Type: {neighbor.details.vehicleDetails.type}</p>
              <p>Make: {neighbor.details.vehicleDetails.make}</p>
              <p>Model: {neighbor.details.vehicleDetails.model}</p>
              <p>Color: {neighbor.details.vehicleDetails.color}</p>
              <p>
                License Plate: {neighbor.details.vehicleDetails.licensePlate}
              </p>
            </section>
          )}

          {neighbor.details.socialMediaLinks.instagram ||
          neighbor.details.socialMediaLinks.facebook ||
          neighbor.details.socialMediaLinks.twitter ||
          neighbor.details.socialMediaLinks.linkedin ||
          neighbor.details.socialMediaLinks.other ? (
            <section>
              <h6>Social Media Links</h6>
              {neighbor.details.socialMediaLinks.instagram && (
                <p>Instagram: {neighbor.details.socialMediaLinks.instagram}</p>
              )}
              {neighbor.details.socialMediaLinks.facebook && (
                <p>Facebook: {neighbor.details.socialMediaLinks.facebook}</p>
              )}
              {neighbor.details.socialMediaLinks.twitter && (
                <p>Twitter: {neighbor.details.socialMediaLinks.twitter}</p>
              )}
              {neighbor.details.socialMediaLinks.linkedin && (
                <p>LinkedIn: {neighbor.details.socialMediaLinks.linkedin}</p>
              )}
              {neighbor.details.socialMediaLinks.other && (
                <p>Other: {neighbor.details.socialMediaLinks.other}</p>
              )}
            </section>
          ) : null}

          {neighbor.details.languagesSpoken.length > 0 && (
            <section>
              <h6>Languages Spoken</h6>
              {neighbor.details.languagesSpoken.map((language) => (
                <p key={language}>{language}</p>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default NeighborCard;
