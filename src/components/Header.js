import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import HeaderLink from './HeaderLink';

export default function Header({ userEmail }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  return (
    <div className="header">
      <Routes>
        <Route path="/sign-in" element={<HeaderLink linkTo="/sign-up" textLink="Регистрация" />} />
        <Route path="/sign-up" element={<HeaderLink linkTo="/sign-in" textLink="Войти" />} />
        <Route path="/" element={<HeaderLink linkTo="/" userEmail={userEmail} signOut={signOut} />} />
      </Routes>
    </div>
  );
};