import React from "react";
import Avatar from "./Avatar";
import Loading from "./Loading";
import SearchResultsItem from "./SearchResultsItem";

const SearchResults = ({ results }) => {
  const { users, isLoading } = results;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="search-results">
      {users.map((user) => {
        return <SearchResultsItem key={user.uid} user={user} />;
      })}
    </div>
  );
};

export default SearchResults;
