import React, { useContext } from 'react';
import './DashboardPage.css';
import { AuthContext } from "../../context/auth.context"

function DashboardPage() {
    const { user } = useContext(AuthContext);
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                Welcome, {user.name}!
            </div>

            <div className="dashboard-content">
                <section className="recent-announcements">
                    <h2>Recent Announcements</h2>
                    <a href='/announcements'>see all</a>
                    {/* List of recent announcements */}
                </section>
                <section className="ongoing-polls">
                    <h2>Ongoing Polls</h2>
                    <a href='/polls'>see all</a>
                    {/* List of ongoing polls */}
                </section>
            </div>
        </div>
    );
}

export default DashboardPage;