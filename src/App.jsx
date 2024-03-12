// src/App.jsx

import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import LandingPage from "./pages/landing/LandingPage";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import GroupPage from "./pages/group/GroupPage";
import EventPage from "./pages/event/EventPage";
import Explorer from "./pages/explorer/Explorer";
import { tokenCheck } from "./utils/fetch";
import { getCookie } from "./common";

function App() {
  const [user, setUser] = useState();
  const [cookie, setCookie] = useState();

  useEffect(() => {
    let cookie = getCookie("jwt_token");

    if (cookie !== false) {
      persistentLogin(cookie);
    }
  }, []);

  const persistentLogin = async (cookie) => {
    let user = await tokenCheck(cookie);
    setUser(user);
    setCookie(cookie);
  };

  return (
    <>
      <Navbar token={cookie} user={user} setUser={setUser} avatar={user?.avatar} />
      <Routes>
        <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
        <Route path="/home" element={<Dashboard token={cookie} user={user} />} />
        <Route path="/signup" element={<SignupPage user={user} setUser={setUser} />} />
        <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
        <Route path="/group/:groupId" element={<GroupPage token={cookie} user={user} />} />
        <Route path="/event/:eventId" element={<EventPage token={cookie} user1={user} />} />
        <Route path="/profile/:username" element={<Profile user={user} />} />
        <Route path="/explorer" element={<Explorer user={user} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
