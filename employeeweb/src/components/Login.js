import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!data.username || !data.password) {
      setError("All fields required");
      return;
    }

    try {
      const res = await API.post("/auth/login", data);

      if (!res.data) {
        setError("Invalid credentials");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }

    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input placeholder="Username"
        onChange={(e)=>setData({...data, username:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setData({...data, password:e.target.value})} />

      <button onClick={handleLogin}>Login</button>

      <p className="login-error">{error}</p>

      <div className="login-register-link">
        <p>Don't have an account?</p>
        <a href="/register">Register Here</a>
      </div>
    </div>
  );
}

export default Login;