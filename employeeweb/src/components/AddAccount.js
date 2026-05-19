import { useState, useEffect } from "react";
import API from "../api";
import "./AddAccount.css";

function AddAccount() {

  const [form, setForm] = useState({
    accnum: "",
    name: "",
    contact: "",
    address: "",
    balance: "",
    userId: ""
  });

  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateAccountNumber = (value) => {
    return /^\d+$/.test(value);
  };

  const validateName = (value) => {
    return /^[a-zA-Z\s]+$/.test(value);
  };

  const validateBalance = (value) => {
    return /^\d+$/.test(value);
  };

  const validateAddress = (value) => {
    return /^[a-zA-Z0-9\s,.-]+$/.test(value);
  };

  // FETCH EMPLOYEES
  useEffect(() => {
    API.get("/user/employees")
      .then(res => {
        console.log("Employees:", res.data);
        setEmployees(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load employees");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Validate on change
    let error = "";
    if (name === "accnum" && value && !validateAccountNumber(value)) {
      error = "Account number must contain only numbers";
    } else if (name === "name" && value && !validateName(value)) {
      error = "Name must contain only letters and spaces";
    } else if (name === "balance" && value && !validateBalance(value)) {
      error = "Balance must contain only numbers";
    } else if (name === "address" && value && !validateAddress(value)) {
      error = "Address contains invalid characters";
    }
    
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation
    const newErrors = {};
    if (!form.accnum || !validateAccountNumber(form.accnum)) {
      newErrors.accnum = "Account number must contain only numbers";
    }
    if (!form.name || !validateName(form.name)) {
      newErrors.name = "Name must contain only letters and spaces";
    }
    if (!form.contact) {
      newErrors.contact = "Contact is required";
    }
    if (!form.address || !validateAddress(form.address)) {
      newErrors.address = "Address contains invalid characters";
    }
    if (!form.balance || !validateBalance(form.balance)) {
      newErrors.balance = "Balance must contain only numbers";
    }
    if (!form.userId) {
      newErrors.userId = "Please select an employee";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    API.post(`/bank/add?userId=${form.userId}`, form)
      .then(() => {
        alert("Account Added Successfully");
        setForm({
          accnum: "",
          name: "",
          contact: "",
          address: "",
          balance: "",
          userId: ""
        });
        setErrors({});
      })
      .catch(() => {
        alert("Error adding account");
      });
  };

  return (
    <div className="add-account-container">
      <h2>Add Account</h2>

      <form className="add-account-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <input 
            name="accnum" 
            placeholder="Account Number (numbers only)" 
            onChange={handleChange}
            value={form.accnum}
            required 
          />
          {errors.accnum && <span className="error-message">{errors.accnum}</span>}
        </div>

        <div className="form-group">
          <input 
            name="name" 
            placeholder="Name (letters only)" 
            onChange={handleChange}
            value={form.name}
            required 
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input 
            name="contact" 
            placeholder="Contact" 
            onChange={handleChange}
            value={form.contact}
            required 
          />
          {errors.contact && <span className="error-message">{errors.contact}</span>}
        </div>

        <div className="form-group">
          <input 
            name="address" 
            placeholder="Address (letters, numbers, spaces, comma, dot, hyphen)" 
            onChange={handleChange}
            value={form.address}
            required 
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <input 
            name="balance" 
            placeholder="Balance (numbers only)" 
            onChange={handleChange}
            value={form.balance}
            required 
            type="text"
          />
          {errors.balance && <span className="error-message">{errors.balance}</span>}
        </div>

        {/*EMPLOYEE DROPDOWN */}
        <div className="form-group">
          <select 
            name="userId" 
            onChange={handleChange}
            value={form.userId}
            required
          >
            <option value="">Select Employee</option>

            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.username}
              </option>
            ))}
          </select>
          {errors.userId && <span className="error-message">{errors.userId}</span>}
        </div>

        <button type="submit">Add Account</button>

      </form>
    </div>
  );
}

export default AddAccount;