import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page-container">
            <header>
                <div className="logo">Neighborhood Admin</div>
                <nav>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>
                </nav>
            </header>
            <main>
                <h1>Welcome to Neighborhood Admin</h1>
                <p>
                    Engage in the democratic administration of your apartment complex. 
                    Create and participate in polls, view announcements, share your views, and more!
                </p>
                <div className="cta-buttons">
                    <Link to="/signup" className="cta-signup">Join Now</Link>
                    <Link to="/login" className="cta-login">Log In</Link>
                </div>
            </main>
            <footer>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </footer>
        </div>
    );
}

export default LandingPage;