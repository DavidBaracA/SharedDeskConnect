import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material";
import NavBar from "../../Components/NavBar";
import * as React from "react";
import { useState, useEffect } from "react";
import SearchImput from "../../Components/SearchInput";

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

  const getSpaces = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/Space/GetSpaces")
        .then((response) => response.json())
        .then((data) => {
          setSpaces(data);
        });

      if (!response) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
    } catch (error) {
      console.error("Error adding reservation:", error.message);
    }
  };
  console.log(spaces);
  useEffect(() => {
    getSpaces();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div className="listed-spaces-page">
        <SearchImput />
        <Box
          sx={{ bgcolor: "background.default", display: "flex", gap: "15px" , flexDirection:"row" , flexWrap: "wrap"}}
        >
          {spaces?.map((space) => 
             <SpaceCard space={space} />
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
};
