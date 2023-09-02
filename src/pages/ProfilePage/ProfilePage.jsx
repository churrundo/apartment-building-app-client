import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/users.service";
import Detail from "../../components/Detail/Detail";
import "./ProfilePage.css";

const defaultDetails = {
  makeAvailable: false,
  apartmentNumber: "",
  profilePicture: "",
  contactNumber: "",
  occupation: "",
  shortBio: "",
  moveInDate: "",
  emergencyContact: {
    name: "",
    phone: "",
  },
  pets: [],
  vehicleDetails: {
    type: "",
    make: "",
    model: "",
    color: "",
    licensePlate: "",
  },
  specialSkills: [],
  socialMediaLinks: {
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    other: "",
  },
  languagesSpoken: [],
};

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState(defaultDetails);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    userService
      .getUser(user._id)
      .then((response) => {
        console.log("Fetched data:", response.data);
        setDetails({ ...defaultDetails, ...response.data.details });
      })
      .catch((error) => {
        console.error("Error fetching user details", error);
      });
  }, [user]);

  useEffect(() => {
    console.log(details);
  }, [details]);

  const handleEdit = (key) => {
    setEditing(key);
  };

  const handleSave = (key, value) => {
    const updatedDetails = { ...details, [key]: value };
    setDetails(updatedDetails);

    // Update the backend using updateUser function
    userService
      .updateUser(user._id, {details:updatedDetails})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating user details", error);
      });

    setEditing(null);
  };

  const handleToggleAvailable = () => {
    const updatedAvailability = { makeAvailable: !details.makeAvailable };
    setDetails((prevDetails) => ({ ...prevDetails, ...updatedAvailability }));

    // Update the backend using updateUser function
    userService
      .updateUser(user._id, updatedAvailability)
      .then((response) => {
        // Handle success
      })
      .catch((error) => {
        console.error("Error updating availability", error);
        // Handle error (e.g., revert the change or show an error message)
      });
  };

  return (
    <div className="profile-page">
      <h1 className="profile-title">{user.name}'s Profile</h1>
      <div className="profile-image-container">
        {details.profilePicture ? (
          <img
            src={details.profilePicture}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <img
            src="/blank-profile-picture.webp"
            alt="Profile"
            className="profile-image"
          />
        )}
      </div>
      <div className="details-container">
        <div className="details-section">
          <p>Personal Details</p>
          <Detail
            label="Email"
            valueKey="email"
            value={user.email}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Apartment Number"
            valueKey="apartmentNumber"
            value={details.apartmentNumber}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Contact Number"
            valueKey="contactNumber"
            value={details.contactNumber}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Occupation"
            valueKey="occupation"
            value={details.occupation}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Short Bio"
            valueKey="shortBio"
            value={details.shortBio}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Move-in Date"
            valueKey="moveInDate"
            value={details.moveInDate}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />
        </div>
        <div className="details-section">
          <p>Emergency contact</p>
          <Detail
            label="Emergency Contact Name"
            valueKey="emergencyContact.name"
            value={details.emergencyContact?.name}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Emergency Contact Phone"
            valueKey="emergencyContact.phone"
            value={details.emergencyContact?.phone}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />
        </div>
        <div className="details-section">
          <p>Vehicle Details</p>
          <Detail
            label="Vehicle Type"
            valueKey="vehicleDetails.type"
            value={details.vehicleDetails.type}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Vehicle Make"
            valueKey="vehicleDetails.make"
            value={details.vehicleDetails.make}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Vehicle Model"
            valueKey="vehicleDetails.model"
            value={details.vehicleDetails.model}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Vehicle Color"
            valueKey="vehicleDetails.color"
            value={details.vehicleDetails.color}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="License Plate"
            valueKey="vehicleDetails.licensePlate"
            value={details.vehicleDetails.licensePlate}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />
        </div>
        <div className="details-section">
          <p>Do you have any skills? Plumbing, electric, etc...</p>
          <Detail
            label="Special Skills"
            valueKey="specialSkills"
            value={details.specialSkills.join(", ")}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />
        </div>
        <div className="details-section">
          <p>Social Media Links</p>

          <Detail
            label="Instagram"
            valueKey="socialMediaLinks.instagram"
            value={details.socialMediaLinks.instagram}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Facebook"
            valueKey="socialMediaLinks.facebook"
            value={details.socialMediaLinks.facebook}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Twitter"
            valueKey="socialMediaLinks.twitter"
            value={details.socialMediaLinks.twitter}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="LinkedIn"
            valueKey="socialMediaLinks.linkedin"
            value={details.socialMediaLinks.linkedin}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />

          <Detail
            label="Other"
            valueKey="socialMediaLinks.other"
            value={details.socialMediaLinks.other}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
          />
        </div>
        <div className="details-section">
          <p>Languages Spoken</p>
          <Detail
            label="Languages"
            valueKey="languagesSpoken"
            value={details.languagesSpoken.join(", ")}
            editing={editing}
            handleEdit={handleEdit}
            handleSave={(key, value) =>
              handleSave(
                key,
                value.split(", ").map((lang) => lang.trim())
              )
            }
          />
        </div>
        <div className="toggle-container">
          <label className="switch-label">
            Do you want this information to be available to other neighbors?{" "}
          </label>
          <input
            type="checkbox"
            checked={details.makeAvailable}
            onChange={handleToggleAvailable}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
