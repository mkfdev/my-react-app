import React from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import "./PetHeader.scss";

const PetHeader = ({ logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="pet-header">
      <h1>[Logo] Pet App Name</h1>
      <nav className="pet-menu">
        <Link to="/petInfo" className="link">
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
};

export default PetHeader;
