import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FAQ from '../../Components/FAQ';
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import Highlights from '../../Components/Highlights';

// const defaultTheme = createTheme({});


export default function HomePage() {
  const darkBlueBase = '#041f60';
  const purple = '#5b5299'
  const lightPurple = '#a6b6f8'

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
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
