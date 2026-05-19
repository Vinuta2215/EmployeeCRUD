import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./ViewAll.css";

function ViewAll() {

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    API.get("/bank/all")
      .then(res => {
        console.log(res.data); // debug
        setList(res.data);
      })
      .catch(err => console.log(err));
  };

  // DELETE
  const deleteAcc = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await API.delete(`/bank/delete/${id}`);
      alert("Deleted Successfully");

      // reload list
      loadData();

    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  // UPDATE NAVIGATION
  const updateAcc = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="view-all-container">
      <h2>All Accounts (Admin)</h2>

      {list.length === 0 ? (
        <p className="no-data">No Data Found</p>
      ) : (
        <div className="table-wrapper">
          <table className="view-all-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Account No</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Balance</th>
                <th>Employee</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map(x => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.accnum}</td>
                  <td>{x.name}</td>
                  <td>{x.contact}</td>
                  <td>{x.address}</td>
                  <td>₹{x.balance}</td>

                  {/*SHOW EMPLOYEE NAME */}
                  <td>
                    {x.user ? x.user.username : "N/A"}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button className="btn-update" onClick={() => updateAcc(x.id)}>
                        Update
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => deleteAcc(x.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewAll;