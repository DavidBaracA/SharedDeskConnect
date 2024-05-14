import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material";
import NavBar from "../../Components/NavBar";
import * as React from "react";
import { useState, useEffect } from "react";
import SearchInput from "../../Components/SearchInput";
import Button from "@mui/material/Button";
import "./ListedSpacesPage.css";
import { SpaceCard } from "../../Components/SpaceCard";

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
      const response = await fetch("http://localhost:5100/api/Space/GetSpaces")
        .then((response) => response.json())
        .then((data) => {
          setSpaces(data);
          setFilteredSpaces(data);
        });

      if (!response) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
    } catch (error) {
      console.error("Error fetching spaces:", error.message);
    }
  };

  useEffect(() => {
    getSpaces();
  }, []);

  const handleSearchChange = (searchTerm) => {
    // Filter spaces based on search term
    const filtered = spaces.filter((space) =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSpaces(filtered);
  };

  const handleSortBy = (property) => {
    // Sort spaces based on the selected property
    let sorted;
    if (property === "price") {
      sorted = [...filteredSpaces].sort((a, b) => a.price - b.price);
    } else if (property === "address") {
      sorted = [...filteredSpaces].sort((a, b) =>
        a.address.localeCompare(b.address)
      );
    } else if (property === "availableCapacity") {
      sorted = [...filteredSpaces].sort(
        (a, b) => b.availableCapacity - a.availableCapacity
      );
    }
    setSortBy(property);
    setFilteredSpaces(sorted);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div className="listed-spaces-page">
        <SearchInput onChange={handleSearchChange} />
        <div className="sort-buttons">
          <Button
            variant="outlined"
            onClick={() => handleSortBy("price")}
            disabled={sortBy === "price"}
          >
            Sort by Price
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortBy("address")}
            disabled={sortBy === "address"}
          >
            Sort by Address
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortBy("availableCapacity")}
            disabled={sortBy === "availableCapacity"}
          >
            Sort by Available Capacity
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
            <SpaceCard key={space.spaceID} space={space} />
          ))}
        </Box>
      </div>
    </ThemeProvider>
  );
};
