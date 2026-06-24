import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TicketPage from "./pages/TicketPage";
import AccountMenu from "./pages/AccountMenu";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  function handleLogout() {
    setIsLoggedIn(false);
    setUserName("");
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/tickets">Tickets</Link>
      </nav>

      {isLoggedIn && <AccountMenu name={userName} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<h1>Welcome</h1>} />

        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />}
        />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/tickets"
          element={isLoggedIn ? <TicketPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;