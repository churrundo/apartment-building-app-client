import React from 'react';
import './DashboardPage.css';

function DashboardPage() {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                Welcome, [USERNAME]!
            </div>

            <div className="dashboard-content">
                <section className="ongoing-polls">
                    <h2>Ongoing Polls</h2>
                    {/* List of ongoing polls */}
                </section>

                <section className="recent-announcements">
                    <h2>Recent Announcements</h2>
                    {/* List of recent announcements */}
                </section>

                <section className="important-notifications">
                    <h2>Important Notifications</h2>
                    {/* List of important notifications */}
                </section>
            </div>
        </div>
    );
}

export default DashboardPage;