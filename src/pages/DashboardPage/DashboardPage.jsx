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

                <section className="recent-announcements">
                    <h2>Recent Announcements</h2>
                    {/* List of recent announcements */}
                </section>

                <div className="dashboard-content">
                <section className="ongoing-polls">
                    <h2>Ongoing Polls</h2>
                    {/* List of ongoing polls */}
                </section>
            </div>
        </div>
    );
}

export default DashboardPage;