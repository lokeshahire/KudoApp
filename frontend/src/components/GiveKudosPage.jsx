import React, { useState, useEffect } from "react";
import "../App.css";

function GiveKudosPage({ setPage, user }) {
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [badge, setBadge] = useState("Helping Hand");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://kudoappbackend.onrender.com/user");
      const data = await response.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://kudoappbackend.onrender.com/kudo/give",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            giver: user.name,
            recipient,
            badge,
            reason,
            likes: 1,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setPage("landing");
      } else {
        alert(result.message || "Failed to give Kudos.");
      }
    } catch (error) {
      console.error("Error submitting Kudos:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="give-kudos-page" style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between">
        <h2>Give Kudos</h2>
        <button onClick={() => setPage("landing")}>Langing Page</button>
      </div>
      <div className="text-center">
        <div>
          <select onChange={(e) => setRecipient(e.target.value)}>
            <option value="">Select the user you wannt to give Kudos</option>
            {users.map((u) => (
              <option key={u._id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select onChange={(e) => setBadge(e.target.value)}>
            <option value="">Select the Badge you want to give</option>
            <option value="Helping Hand">Helping Hand</option>
            <option value="Excellence">Excellence</option>
            <option value="Above and Beyond">Above and Beyond</option>
            <option value="Client Focus">Client Focus</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => setReason(e.target.value)}>
            <option value=""> Reason for Kudos</option>
            <option value="Good">Good</option>
            <option value="Great job">Great job</option>
            <option value="Nice">Nice</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <button className="text-center" onClick={handleSubmit}>
          Give Kudos
        </button>
      </div>
    </div>
  );
}

export default GiveKudosPage;
