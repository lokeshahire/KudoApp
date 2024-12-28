import React from "react";
import "../App.css";

function LandingPage({ user, setPage }) {
  const handleKudos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/kudos/${user.name}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(`${user.name}'s Kudos count increased!`);
      } else {
        alert(result.message || "Failed to increase Kudos.");
      }
    } catch (error) {
      console.error("Error updating Kudos:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="landing-page">
      <header className="landing-header d-flex">
        <button className="landing-btn" onClick={() => setPage("login")}>
          Login
        </button>

        <button className="landing-btn" onClick={() => setPage("giveKudos")}>
          Give Kudos
        </button>
      </header>

      <main className="landing-main">
        <h1 className="mb-5">
          Welcome,{" "}
          {user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}
          !
        </h1>

        <p>Thanks for your help with last project </p>
        <button className="thumbs-up-btn" onClick={handleKudos}>
          ❤
        </button>
      </main>

      <footer className="landing-footer">
        <button className="landing-btn" onClick={() => setPage("analytics")}>
          🔍
        </button>
      </footer>
    </div>
  );
}

export default LandingPage;
