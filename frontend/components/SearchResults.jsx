import React from "react";
import NavBar from "./NavBar";
import Products from "./Products";

function SearchResults() {
  return (
    <>
      <NavBar />
      <div className="search-results">
        <div className="search-results-text">Results for Samsung s10 + </div>
        <Products />
      </div>
    </>
  );
}

export default SearchResults;
