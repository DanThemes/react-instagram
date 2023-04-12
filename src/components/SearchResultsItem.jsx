import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const SearchResultsItem = ({ user }) => {
  return (
    <Link to={`/profile/${user.username}`}>
      <div className="search-results-item">
        <div className="search-results-item-avatar">
          <Avatar user={user} size="small" showUsername={false} />
        </div>
        <div className="search-results-item-username">{user.username}</div>
      </div>
    </Link>
  );
};

export default SearchResultsItem;
