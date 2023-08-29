
function ProfilePage() {
  return (
      <div className="profile-container">
          <h1>My Profile</h1>
          <div className="profile-details">
              <div className="profile-image">
                  {/* This can be an img tag or a div with a background image */}
                  <img src="/path-to-your-default-image.jpg" alt="Profile Pic" />
              </div>
              <div className="profile-info">
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Email:</strong> johndoe@example.com</p>
                  <p><strong>Apartment Number:</strong> 123</p>
                  {/* Add more details as needed */}
              </div>
          </div>
          <div className="profile-actions">
              <button>Edit Profile</button>
              <button>Change Password</button>
          </div>
      </div>
  );
}

export default ProfilePage;