import React, { useState } from "react";
import "../App.css";

function LoginPage({ setUser, setPage }) {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    let newname = name.toLowerCase();
    const response = await fetch(`http://localhost:8080/user?name=${newname}`);
    const data = await response.json();

    if (data.exists) {
      setUser(data.user);
      setPage("landing");
    } else {
      alert("User not found");
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
      />

      <button onClick={handleLogin} className="loginbtn">
        Login
      </button>
    </div>
  );
}

export default LoginPage;
