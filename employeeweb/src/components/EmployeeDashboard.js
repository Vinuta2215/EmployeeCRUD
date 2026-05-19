import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyAccount from "./MyAccount";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="employee-dashboard-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ margin: 0 }}>Employee Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-header">
        <h3>Welcome, {user?.username}!</h3>
        <p>Manage your bank accounts</p>
      </div>

      <MyAccount />
    </div>
  );
}

export default EmployeeDashboard;