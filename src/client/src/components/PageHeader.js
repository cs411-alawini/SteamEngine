import React from "react";
import { Link } from "react-router-dom"; 
import "./PageHeader.css";
import "./SearchBar.js";

const PageHeader = () => {
  return (
    <header className="page-header">
      <Link to="/"Home style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo">SteamEngine</div>
      </Link>
      <div className="search-bar-container"></div>
    </header>
  );
};

export default PageHeader;
