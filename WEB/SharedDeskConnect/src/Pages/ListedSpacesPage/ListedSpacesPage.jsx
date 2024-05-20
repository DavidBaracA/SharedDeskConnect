import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { createTheme } from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  ArrowForward,
} from "@mui/icons-material";
import NavBar from "../../Components/NavBar";
import SearchInput from "../../Components/SearchInput";
import { SpaceCard } from "../../Components/SpaceCard";
import "./ListedSpacesPage.css";

export const ListedSpacesPage = () => {
  const darkBlueBase = "#041f60";
  const purple = "#5b5299";
  const lightPurple = "#a6b6f8";

  const theme = createTheme({
    palette: {
      primary: {
        main: darkBlueBase,
      },
      secondary: {
        main: purple,
        light: lightPurple,
      },
    },
  });

  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const getSpaces = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/Space/GetSpaces");
      const data = await response.json();
      setSpaces(data);
      setFilteredSpaces(data);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching spaces:", error.message);
    }
  };

  useEffect(() => {
    getSpaces();
  }, []);

  const handleSearchChange = (searchTerm) => {
    const filtered = spaces.filter((space) =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSpaces(filtered);
  };

  const handleSortBy = (property) => {
    let sorted;
    switch (property) {
      case "lowPrice":
        sorted = [...filteredSpaces].sort((a, b) => a.price - b.price);
        break;
      case "highPrice":
        sorted = [...filteredSpaces].sort((a, b) => b.price - a.price);
        break;
      case "startAlphabet":
        sorted = [...filteredSpaces].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "endAlphabet":
        sorted = [...filteredSpaces].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      case "lowCapacity":
        sorted = [...filteredSpaces].sort(
          (a, b) => a.availableCapacity - b.availableCapacity
        );
        break;
      case "highCapacity":
        sorted = [...filteredSpaces].sort(
          (a, b) => b.availableCapacity - a.availableCapacity
        );
        break;
      default:
        sorted = filteredSpaces;
    }
    setSortBy(property);
    setFilteredSpaces(sorted);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div className="listed-spaces-page">
        <div className="search-container">
          <SearchInput onSearchChange={handleSearchChange} />
        </div>
        <div className="sort-buttons">
          <Button
            variant="outlined"
            onClick={() => handleSortBy("lowPrice")}
            disabled={sortBy === "lowPrice"}
          >
            Low Price
            <IconButton size="small">
              <ArrowDownward fontSize="inherit" />
            </IconButton>
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortBy("highPrice")}
            disabled={sortBy === "highPrice"}
          >
            High Price
            <IconButton size="small">
              <ArrowUpward fontSize="inherit" />
            </IconButton>
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortBy("startAlphabet")}
            disabled={sortBy === "startAlphabet"}
          >
            Start Alphabet
            <IconButton size="small">
              <ArrowForward fontSize="inherit" />
            </IconButton>
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortBy("endAlphabet")}
            disabled={sortBy === "endAlphabet"}
          >
            End Alphabet
            <IconButton size="small">
              <ArrowForward fontSize="inherit" />
            </IconButton>
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortBy("lowCapacity")}
            disabled={sortBy === "lowCapacity"}
          >
            Low Capacity
            <IconButton size="small">
              <ArrowDownward fontSize="inherit" />
            </IconButton>
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortBy("highCapacity")}
            disabled={sortBy === "highCapacity"}
          >
            High Capacity
            <IconButton size="small">
              <ArrowUpward fontSize="inherit" />
            </IconButton>
          </Button>
        </div>
        <Box
          sx={{
            bgcolor: "background.default",
            display: "flex",
            gap: "15px",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {filteredSpaces.map((space) => (
            <SpaceCard key={space.spaceID} space={space} editMode={false} />
          ))}
        </Box>
      </div>
    </ThemeProvider>
  );
};
