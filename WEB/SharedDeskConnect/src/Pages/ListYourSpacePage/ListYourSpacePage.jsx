import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme } from "@mui/material";
import NavBar from "../../Components/NavBar";

export const ListYourSpacePage = () => {
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
      <Box sx={{ bgcolor: "background.default" }}>
        <div>List Your Space</div>
      </Box>
    </ThemeProvider>
  );
};