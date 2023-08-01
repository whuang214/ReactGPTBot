import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

import userService from "./utils/userService";

import "./App.css";

export default function App() {
  const [user, setUser] = useState(userService.getUser());
  console.log(user);

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
    </Routes>
  );
}
