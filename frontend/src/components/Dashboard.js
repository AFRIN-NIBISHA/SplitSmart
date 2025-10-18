import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();

  // Mock groups for testing
  const groups = [
    { id: 1, name: "Trip to Goa" },
    { id: 2, name: "Roommates Rent" },
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dashboard</h2>
      {user && <p>Welcome, {user.email || user.name}</p>}
      <button onClick={logout}>Logout</button>

      <h3>Your Groups:</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <Link to={`/group/${group.id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
