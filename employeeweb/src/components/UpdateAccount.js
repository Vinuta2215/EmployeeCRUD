import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./UpdateAccount.css";

function UpdateAccount() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name:"",
    contact:"",
    address:"",
    balance:""
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateName = (value) => {
    return /^[a-zA-Z\s]+$/.test(value);
  };

  const validateBalance = (value) => {
    return /^\d+$/.test(value);
  };

  const validateAddress = (value) => {
    return /^[a-zA-Z0-9\s,.-]+$/.test(value);
  };

  useEffect(() => {
    API.get("/bank/all?role=ADMIN")
      .then(res => {
        const acc = res.data.find(x => x.id == id);
        if (acc) setData(acc);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value});
    
    // Validate on change
    let error = "";
    if (name === "name" && value && !validateName(value)) {
      error = "Name must contain only letters and spaces";
    } else if (name === "balance" && value && !validateBalance(value)) {
      error = "Balance must contain only numbers";
    } else if (name === "address" && value && !validateAddress(value)) {
      error = "Address contains invalid characters";
    }
    
    setErrors({ ...errors, [name]: error });
  };

  const handleUpdate = async () => {
    // Final validation
    const newErrors = {};
    if (!data.name || !validateName(data.name)) {
      newErrors.name = "Name must contain only letters and spaces";
    }
    if (!data.address || !validateAddress(data.address)) {
      newErrors.address = "Address contains invalid characters";
    }
    if (!data.balance || !validateBalance(data.balance)) {
      newErrors.balance = "Balance must contain only numbers";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await API.put(`/bank/update/${id}?role=ADMIN`, data);
      alert("Account Updated Successfully");
      navigate("/view");
    } catch (err) {
      alert("Error updating account");
    }
  };

  return (
    <div className="update-account-container">
      <h2>Update Account</h2>

      <form className="update-account-form">
        <div className="form-group">
          <label>Name</label>
          <input 
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name (letters only)"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Contact</label>
          <input 
            name="contact"
            value={data.contact}
            onChange={(e)=>setData({...data,contact:e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input 
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Address (letters, numbers, spaces, comma, dot, hyphen)"
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>Balance</label>
          <input 
            name="balance"
            value={data.balance}
            onChange={handleChange}
            placeholder="Balance (numbers only)"
            type="text"
          />
          {errors.balance && <span className="error-message">{errors.balance}</span>}
        </div>

        <button type="button" onClick={handleUpdate}>Update Account</button>
      </form>

      <div className="back-button">
        <a href="/view">← Back to View All</a>
      </div>
    </div>
  );
}

export default UpdateAccount;