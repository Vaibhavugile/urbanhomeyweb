import React from "react";
import "./DashboardLookingSection.css";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

function DashboardLookingSection() {
    return (
        <section className="dashboard-looking-section">

            <h1 className="dashboard-looking-title">
                Find Your Perfect Living Match
            </h1>

            <div className="dashboard-looking-container">

                <div className="dashboard-looking-card">

                    <div className="dashboard-icon-box">
                        <Home size={40} />
                    </div>

                    <h2>Has a Flat</h2>

                    <p>
                        Find the perfect roommate for your space and build a comfortable living environment together.
                    </p>

                    <Link
                        to="/list-room"
                        className="dashboard-card-link"
                    >
                        List Your Room
                        <span className="dashboard-arrow">→</span>
                    </Link>

                </div>

                <div className="dashboard-looking-card">

                    <div className="dashboard-icon-box">
                        <Search size={40} />
                    </div>

                    <h2>Looking for Flat + Flatmates</h2>

                    <p>
                        Discover quality homes and build meaningful roommate connections for a better living experience.
                    </p>

                    <a href="/" className="dashboard-card-link">
                        Start searching
                        <span className="dashboard-arrow">→</span>
                    </a>

                </div>

            </div>

        </section>
    );
}

export default DashboardLookingSection;