import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import "./Dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <h2>Welcome to the Dashboard</h2>
          <p>This is your main content area.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
