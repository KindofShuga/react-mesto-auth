import React from 'react';
import headerLogo from '../images/logo-icon.svg'

export default function Header() {
  return (
    <div className="header">
      <img src={headerLogo} alt="Логотип Место" className="header__logo" />
    </div>
  );
};