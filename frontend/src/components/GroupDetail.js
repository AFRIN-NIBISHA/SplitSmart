import React from "react";
import { useParams, Link } from "react-router-dom";

export default function GroupDetail() {
  const { id } = useParams();

  // Mock expenses
  const expenses = [
    { id: 1, desc: "Lunch", amount: 500 },
    { id: 2, desc: "Hotel", amount: 2000 },
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Group {id} Detail</h2>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.desc} - ₹{e.amount}
          </li>
        ))}
      </ul>
      <Link to={`/group/${id}/add-expense`}>Add Expense</Link>
    </div>
  );
}
