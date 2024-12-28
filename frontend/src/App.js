import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import GiveKudosPage from "./components/GiveKudosPage";
import AnalyticsPage from "./components/AnalyticsPage";
import LoginPage from "./components/LoginPage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  if (!user || page === "login")
    return <LoginPage setUser={setUser} setPage={setPage} />;
  if (page === "landing") return <LandingPage user={user} setPage={setPage} />;
  if (page === "giveKudos")
    return <GiveKudosPage setPage={setPage} user={user} />;
  if (page === "analytics") return <AnalyticsPage setPage={setPage} />;
}

export default App;
