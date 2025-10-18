import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AddExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log
    console.log(`Group ${id} - ${desc} : ₹${amount}`);
    navigate(`/group/${id}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add Expense to Group {id}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
