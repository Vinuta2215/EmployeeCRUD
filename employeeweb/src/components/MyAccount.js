import { useEffect, useState } from "react";
import API from "../api";
import "./MyAccount.css";

function MyAccount() {

  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    console.log("USER:", user); //DEBUG

    if (!user || !user.id) {
      alert("Please login again");
      return;
    }

    API.get(`/bank/my?userId=${user.id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));

  }, [user]);

  return (
    <div className="my-account-container">
      <h2>My Account</h2>

      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-text">No accounts found</div>
        </div>
      ) : (
        <div className="account-cards">
          {data.map(x => (
            <div key={x.id} className="account-card">
              <div className="account-card-header">
                <div className="account-card-title">Account Details</div>
                <div className="account-card-id">ID: {x.id}</div>
              </div>
              
              <div className="account-info">
                <div className="info-row">
                  <span className="info-label">Account Number:</span>
                  <span className="info-value">{x.accnum}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{x.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Contact:</span>
                  <span className="info-value">{x.contact}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Address:</span>
                  <span className="info-value">{x.address}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Balance:</span>
                  <span className="balance-value">₹{x.balance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAccount;