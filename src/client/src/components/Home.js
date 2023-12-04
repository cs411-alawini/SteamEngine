import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  getGamesWithFilter,
  getBestGames,
  getPopularByAgeGames,
} from "../api/game";
import { CircularProgress, Button } from "@mui/material";
import GameDisplay from "./GameDisplay";
import FilterBar from "./FilterBar";
import "./Home.css";

const Home = ({ loggedIn, username, setLoggedIn, setUsername }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState([]);
  const [yearRange, setYearRange] = useState([1990, 2023]);
  const [mac, setMac] = useState(1);
  const [windows, setWindows] = useState(1);
  const [linux, setLinux] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [requiredAge, setRequiredAge] = useState(21);
  const [metaCriticRange, setMetaCriticRange] = useState([20, 101]);
  const [sortBy, setSortBy] = useState("MetaCritic");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [gameResults, setGameResults] = useState([]);

  const fetchBestGames = async () => {
    setIsLoading(true);
    try {
      const results = await getBestGames();
      setGameResults(results.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchPopularTeenGames = async () => {
    setIsLoading(true);
    try {
      const results = await getPopularByAgeGames(10, 20);
      setGameResults(results.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const navigate = useNavigate();

  const onButtonClick = () => {};

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await getGamesWithFilter({
          keyword,
          tags: tags.join(),
          minYear: yearRange[0],
          maxYear: yearRange[1],
          mac,
          windows,
          linux,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          requiredAge,
          minMetaCritic: metaCriticRange[0],
          maxMetaCritic: metaCriticRange[1],
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
    yearRange,
    mac,
    windows,
    linux,
    priceRange,
    requiredAge,
    metaCriticRange,
    sortBy,
    sortOrder,
  ]);

  return (
    <>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <Button
        variant="contained"
        onClick={fetchBestGames}
        style={{ marginRight: "8px" }}
      >
        Find 'Best' Games
      </Button>
      <Button variant="contained" onClick={fetchPopularTeenGames}>
        Find Popular GenZ Games
      </Button>
      <div className="bottom-container">
        {isLoading ? <CircularProgress /> : <GameDisplay games={gameResults} />}
        <FilterBar
          loggedIn={loggedIn}
          username={username}
          tags={tags}
          setTags={setTags}
          yearRange={yearRange}
          setYearRange={setYearRange}
          mac={mac}
          setMac={setMac}
          windows={windows}
          setWindows={setWindows}
          linux={linux}
          setLinux={setLinux}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          requiredAge={requiredAge}
          setRequiredAge={setRequiredAge}
          metaCriticRange={metaCriticRange}
          setMetaCriticRange={setMetaCriticRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      <div className="top-right">
        {loggedIn ? (
          <div className="logged-in-user">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            Log in
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
