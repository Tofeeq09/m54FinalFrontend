// Path: src/App.jsx

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

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
  const [followData, setFollowData] = useState({
    followers: [],
    following: [],
  });

  useEffect(() => {
    let cookieValue = getCookie("jwt_token");

    if (cookieValue) {
      persistentLogin(cookieValue);
    }
  }, []);

  const persistentLogin = async (cookieValue) => {
    if (cookieValue) {
      let userData = await tokenCheck(cookieValue);
      setUser(userData);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar
        token={getCookie("jwt_token")}
        user={user}
        setUser={setUser}
        avatar={user?.avatar}
      />
      <Routes>
        <Route
          path="/"
          element={<LandingPage user={user} setUser={setUser} />}
        />
        <Route
          path="/home"
          element={
            <Dashboard
              token={getCookie("jwt_token")}
              user={user}
              followData={followData}
              setFollowData={setFollowData}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignupPage user={user} setUser={setUser} />}
        />
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
        <Route
          path="/group/:groupId"
          element={<GroupPage token={getCookie("jwt_token")} user={user} />}
        />
        <Route
          path="/event/:eventId"
          element={<EventPage token={getCookie("jwt_token")} user1={user} />}
        />
        <Route
          path="/profile/:username"
          element={
            <Profile
              user={user}
              setUser={setUser}
              token={getCookie("jwt_token")}
            />
          }
        />
        <Route path="/explorer" element={<Explorer user={user} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
