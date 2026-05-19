import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const [data, setData] = useState({
    username: "",
    password: "",
    role: "EMPLOYEE"
  });

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Password validation: 6 characters minimum with at least one special character
  const validatePassword = (value) => {
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return value.length >= 6 && specialCharRegex.test(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setData({ ...data, password: value });
    
    if (value && !validatePassword(value)) {
      if (value.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
      } else {
        setPasswordError("Password must contain at least one special character (!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?");
      }
    } else {
      setPasswordError("");
    }
  };

  const handleRegister = async () => {

    if (!data.username) {
      setError("Username is required");
      return;
    }

    if (!data.password) {
      setError("Password is required");
      return;
    }

    if (!validatePassword(data.password)) {
      setError("Password must be at least 6 characters with at least one special character");
      return;
    }

    try {
      await API.post("/auth/register", data);
      alert("Registered Successfully");
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <input 
        placeholder="Username"
        value={data.username}
        onChange={(e)=>setData({...data, username:e.target.value})} 
      />

      <div className="form-group">
        <input 
          type="password" 
          placeholder="Password (min 6 chars + 1 special char)"
          value={data.password}
          onChange={handlePasswordChange}
        />
        {passwordError && <span className="error-message">{passwordError}</span>}
      </div>

      <select onChange={(e)=>setData({...data, role:e.target.value})}>
        <option value="EMPLOYEE">EMPLOYEE</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button onClick={handleRegister}>Register</button>

      <p className="register-error">{error}</p>

      <div className="register-info">
        <strong>Password Requirements:</strong>
        <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
          <li>Minimum 6 characters</li>
          <li>At least one special character (!@#$%^&*)</li>
        </ul>
      </div>
    </div>
  );
}

export default Register;