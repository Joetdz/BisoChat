import React from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";

const SearchForm = () => {
  return (
    <div className="form">
      <div className="icon-search">
        <BsSearch />
      </div>
      <input type="text" placeholder="search"></input>
      <div className="icon-more">
        <AiOutlineMore />
      </div>
    </div>
  );
};

export default SearchForm;
