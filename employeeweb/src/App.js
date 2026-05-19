import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AddAccount from "./components/AddAccount";
import ViewAll from "./components/ViewAll";
import UpdateAccount from "./components/UpdateAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/add" element={<AddAccount />} />
        <Route path="/view" element={<ViewAll />} />
        <Route path="/update/:id" element={<UpdateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;