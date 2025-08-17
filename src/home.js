import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar(){
    return(
        <div className="search-input">
            <Fasearch />
            <input type="text" placeholder="search a city.."></input>
        </div>
    )
}