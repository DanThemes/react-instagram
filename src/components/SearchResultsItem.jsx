import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const SearchResultsItem = ({ user }) => {
  return (
    <div className="search-results-item">
      <div className="search-results-item-avatar">
        <Avatar uid={user.uid} size="small" />
      </div>
    </div>
  );
};

export default SearchResultsItem;
