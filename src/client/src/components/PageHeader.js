import React from "react";
import "./PageHeader.css";
import "./SearchBar.js";

const PageHeader = () => {
  return (
    <header className="page-header">
      <div className="logo">SteamEngine</div>
      <div className="search-bar-container"></div>
    </header>
  );
};

export default PageHeader;
