import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import GroupDetail from "./components/GroupDetail";
import AddExpense from "./components/AddExpense";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/group/:id" element={<GroupDetail />} />
        <Route path="/group/:id/add-expense" element={<AddExpense />} />
      </Routes>
    </Router>
  );
}

export default App;
