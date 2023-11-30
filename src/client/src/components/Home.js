// Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import SearchResults from "../SearchResults";
import {getGamesWithFilter} from "../api/game";
import { CircularProgress } from "@mui/material";
import GameDisplay from "./GameDisplay";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState([]);
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(9999);
  const [mac, setMac] = useState(1);
  const [windows, setWindows] = useState(1);
  const [linux, setLinux] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [requiredAge, setRequiredAge] = useState(999);
  const [minMetaCritic, setMinMetaCritic] = useState(0);
  const [maxMetaCritic, setMaxMetaCritic] = useState(101);
  const [sortBy, setSortBy] = useState("MetaCritic");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [gameResults, setGameResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await getGamesWithFilter({
          keyword,
          tags,
          minYear,
          maxYear,
          mac,
          windows,
          linux,
          minPrice,
          maxPrice,
          requiredAge,
          minMetaCritic,
          maxMetaCritic,
          sortBy,
          sortOrder,
        });
        console.log("results", results);
        setGameResults(results.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [
    keyword,
    tags,
    minYear,
    maxYear,
    mac,
    windows,
    linux,
    minPrice,
    maxPrice,
    requiredAge,
    minMetaCritic,
    maxMetaCritic,
    sortBy,
    sortOrder,
  ]);

  return (
    <>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />

      {isLoading ? <CircularProgress /> : <GameDisplay games={gameResults} />}
    </>
  );
};

export default Home;
