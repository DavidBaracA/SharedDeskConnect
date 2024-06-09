import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FAQ from '../../Components/FAQ';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import Highlights from '../../Components/Highlights';
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const darkBlueBase = '#041f60';
  const purple = '#5b5299'
  const lightPurple = '#a6b6f8'
  const navigate = useNavigate();

  const theme = createTheme({
      palette: {
        primary: {
          main: darkBlueBase
        },
        secondary: {
          main: purple,
          light:lightPurple
      },
    
    },
  });
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };
   const handleNavigateToHighlights = () =>{
    navigate("/");
    // Scroll to the FAQ section
    scrollToSection("highlights");
  };

   
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar handleNavigateToHighlights={handleNavigateToHighlights} />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <Highlights/>
        <Divider />
        <FAQ/>
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
