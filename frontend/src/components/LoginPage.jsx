import React, { useState } from "react";
import "../App.css";

function LoginPage({ setUser, setPage }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    let newname = name.toLowerCase();

    try {
      const response = await fetch(
        `https://kudoappbackend.onrender.com/user?name=${newname}`
      );
      const data = await response.json();

      if (data.exists) {
        setUser(data.user);
        setPage("landing");
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logindiv">
      <h1 className="logintitle">WELCOME TO KUDOSPOT</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="logininput"
        disabled={loading}
      />
      <button onClick={handleLogin} className="loginbtn" disabled={loading}>
        {loading ? "Loading..." : "Login"}{" "}
      </button>
      {loading && <div className="spinner"></div>}
    </div>
  );
}

export default LoginPage;
