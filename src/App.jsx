// src/App.jsx

import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import GroupPage from "./pages/group/GroupPage";
import EventPage from "./pages/event/EventPage";
import Explorer from "./pages/explorer/Explorer";

import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar user={user} setUser={setUser} avatar={user?.avatar} />
      <Routes>
        <Route
          path="/"
          element={<LandingPage user={user} setUser={setUser} />}
        />
        <Route path="/home" element={<Dashboard user={user} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/group/:groupId" element={<GroupPage user={user} />} />
        <Route path="/event/:eventId" element={<EventPage user={user} />} />
        <Route path="/profile/:username" element={<Profile user={user} />} />
        <Route path="/explorer" element={<Explorer user={user} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
