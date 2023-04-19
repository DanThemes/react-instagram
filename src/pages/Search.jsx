import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchUsers } from "../hooks/users";
import SearchResults from "../components/SearchResults";

const searchSchema = yup.object().shape({
  keyword: yup.string().required("Required"),
});

const Search = () => {
  const [searchTerm, setSeachTerm] = useState("");
  const results = useSearchUsers(searchTerm);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(searchSchema) });

  const handleSearch = (data) => {
    setSeachTerm(data.keyword);
    // reset();
  };

  return (
    <div className="search">
      <h1>Search User</h1>
      <form onSubmit={handleSubmit(handleSearch)}>
        <input
          type="search"
          {...register("keyword")}
          placeholder="Type a username"
        />
        {errors.keyword && (
          <div className="form-error-message">{errors.keyword.message}</div>
        )}
        <button type="submit">Search</button>
      </form>

      {results && <SearchResults results={results} />}
    </div>
  );
};

export default Search;
