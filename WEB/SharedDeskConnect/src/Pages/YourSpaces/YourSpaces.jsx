import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material";
import NavBar from "../../Components/NavBar";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./YourSpaces.css";
import { SpaceCard } from "../../Components/SpaceCard";

export const YourSpaces = () => {
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
  const navigate = useNavigate();

  const [spaces, setSpaces] = useState([]);
  const currentUserId = useSelector((state) => state.currentUserID);
  let currentUserSpaces = []
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
  currentUserSpaces = spaces.filter((space)=>space.renterUserId === currentUserId)


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div className="listed-spaces-page">
        <h2>Your Spaces</h2>
        {currentUserSpaces.length > 0 ?
        (<Box
          sx={{ bgcolor: "background.default", display: "flex", gap: "15px" , flexDirection:"row" , flexWrap: "wrap"}}
        >
          {currentUserSpaces?.map((space) => 
             <SpaceCard space={space} editMode={true}/>
          )}
        </Box>)
        : (<div><p>You did not add any spaces yet, click on <a href="#"onClick={()=>navigate("/list-a-space")}>list a space</a> to add one.</p></div>)}
      </div>
    </ThemeProvider>
  );
};