import React from "react";
import Avatar from "./Avatar";

const SearchResultsItem = ({ user }) => {
  return (
    <div className="search-results-item">
      <div className="search-results-item-avatar">
        <Avatar uid={user.uid} size="small" showUsername={false} />
      </div>
      <div className="search-results-item-username">{user.username}</div>
    </div>
  );
};

export default SearchResultsItem;
