import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="nav-list">
        <Link to="/add" className="nav-card">Add Account</Link>
        <Link to="/view" className="nav-card">View All Accounts</Link>
      </div>

      <div className="dashboard-info">
        <h3>Admin Features</h3>
        <ul>
          <li><strong>Add Account:</strong> Create new bank accounts for employees</li>
          <li><strong>View All:</strong> View all accounts with employee details</li>
          <li><strong>Update:</strong> Modify account information</li>
          <li><strong>Delete:</strong> Remove accounts from the system</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;