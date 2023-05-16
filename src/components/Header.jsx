import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo">
          VIN decryptor
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link className="header__nav-link" to="/">
                Main Page
              </Link>
            </li>
            <li>
              <Link className="header__nav-link" to="/variables">
                Variables
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
