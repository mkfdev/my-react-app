import React, { memo } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import "./PetHeader.scss";

const PetHeader = memo(({ logout, handleHomeMenu }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="pet-header">
      <h1>
        <img className="logo" src="/images/logo.jpg" alt="" />
        <span className="text-round">우</span>
        <span className="text-round">리</span>
        <span className="text-round">같</span>
        <span className="text-round">이</span>
        <span className="text-round">있</span>
        <span className="text-round">개</span>
      </h1>
      <nav className="pet-menu">
        <Link to="/petInfo" className="link" onClick={handleHomeMenu}>
          Home
        </Link>
        <Link to="/search" className="link">
          Search
        </Link>
      </nav>
      <button className="btn-logout" onClick={handleLogout}>
        <MdLogout size="20" />
        <span>Logout</span>
      </button>
    </header>
  );
});

export default PetHeader;
