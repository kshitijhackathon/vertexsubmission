import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { Header } from "./components/Header";
import { SOSPanel } from "./components/SOSPanel";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Learn } from "./pages/Learn";
import { Alerts } from "./pages/Alerts";
import { Drills } from "./pages/Drills";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { Admin } from "./pages/Admin";
import { Demo } from "./pages/Demo";
import { QuizFlood } from "./pages/QuizFlood";
import { Assistant } from "./pages/Assistant";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string; name: string } | null>(null);

  const handleLogin = (userData: { email: string; role: string; name: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* ✅ Top Navbar */}
      <Header user={user} onLogout={handleLogout} />

      {/* ✅ Routed Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/drills" element={<Drills />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/quiz/flood" element={<QuizFlood />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route
          path="/admin"
          element={user?.role === "admin" ? <Admin /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ✅ Global components */}
      <SOSPanel />
      <Footer />
    </div>
  );
}

export default App;

