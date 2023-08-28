import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Apartment Admin</h1>
                <div className="cta-buttons">
                    <Link to="/signup" className="cta-signup">Sign Up</Link>
                    <Link to="/login" className="cta-login">Log In</Link>
                </div>
            </header>
            
            <main className="homepage-main">
                <h2>Welcome to Apartment Admin</h2>
                <p>
                    A platform for apartment neighbors to democratically administer 
                    their community. Sign up to participate or log in if you're already a member.
                </p>
            </main>
            
            <footer className="homepage-footer">
                <p>&copy; 2023 Apartment Admin. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;