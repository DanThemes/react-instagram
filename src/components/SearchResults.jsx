import React from "react";
import Avatar from "./Avatar";

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {console.log(results)}
      {results.map((user) => {
        return <Avatar key={user.uid} uid={user.uid} size="small" />;
      })}
    </div>
  );
};

export default SearchResults;
