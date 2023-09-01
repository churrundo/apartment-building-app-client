import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import detailsService from '../../services/details.service';
import Loading from "../../components/Loading/Loading"

function ProfilePage() {
    const { user } = useContext(AuthContext);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (user && user.detailsId) {
            detailsService.fetchDetailsById(user.detailsId)
                .then(response => {
                    setDetails(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user details", error);
                });
        }
    }, [user]);

    if (!details) return <Loading />;

    return (
        <div className="profile-page">
            <h1>{details.fullName}'s Profile</h1>

            <img src={details.profilePicture} alt="Profile" />

            <div>
                <strong>Apartment Number:</strong> {details.apartmentNumber}
            </div>
            
            <div>
                <strong>Contact Number:</strong> {details.contactNumber}
            </div>

            <div>
                <strong>Email:</strong> {details.email}
            </div>

            <div>
                <strong>Occupation:</strong> {details.occupation}
            </div>

            <div>
                <strong>Short Bio:</strong> {details.shortBio}
            </div>

            <div>
                <strong>Move-in Date:</strong> {details.moveInDate && details.moveInDate.toDateString()}
            </div>

            <div>
                <strong>Emergency Contact:</strong> {details.emergencyContact.name} - {details.emergencyContact.phone}
            </div>

            <div>
                <strong>Pets:</strong> {details.pets.map((pet, index) => <div key={index}>{pet.type} - {pet.name}</div>)}
            </div>

            <div>
                <strong>Vehicle Details:</strong>
                Type: {details.vehicleDetails.type}<br />
                Make: {details.vehicleDetails.make}<br />
                Model: {details.vehicleDetails.model}<br />
                Color: {details.vehicleDetails.color}<br />
                License Plate: {details.vehicleDetails.licensePlate}
            </div>

            <div>
                <strong>Special Skills:</strong> {details.specialSkills.join(", ")}
            </div>

            <div>
                <strong>Social Media Links:</strong>
                Instagram: {details.socialMediaLinks.instagram}<br />
                Facebook: {details.socialMediaLinks.facebook}<br />
                Twitter: {details.socialMediaLinks.twitter}<br />
                LinkedIn: {details.socialMediaLinks.linkedin}
                Other: {details.socialMediaLinks.other}<br />
            </div>

            <div>
                <strong>Languages Spoken:</strong> {details.languagesSpoken.join(", ")}
            </div>
        </div>
    );
}

export default ProfilePage;
