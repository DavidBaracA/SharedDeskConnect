import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import NavBar from "../../Components/NavBar";
import { createTheme } from "@mui/material";

const YourRentalsPage = () => {
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

  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = useSelector((state) => state.currentUserID);

  useEffect(() => {
    const fetchUserRentals = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/api/Rental/UserRentals/${currentUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user rentals");
        }
        const data = await response.json();
        setRentals(data);
      } catch (error) {
        console.error("Error fetching user rentals:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRentals();
  }, [currentUserId]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container sx={{marginTop: "130px"}}>
        <Typography variant="h4" gutterBottom>
          Your Rentals
        </Typography>
        <Divider style={{ margin: "10px 0" }} />
        {rentals.length === 0 ? (
          <Container>
            <Typography variant="h6">No approved rentals found.</Typography>
          </Container>
        ) : (
          rentals.map((rental) => (
            <Card key={rental.RentalID} style={{ marginBottom: "20px" }}>
              <CardContent>
                <Typography variant="h6">{rental.spaceName}</Typography>
                <Divider style={{ margin: "10px 0" }} />
                <Typography>
                  Rental Period:{" "}
                  {new Date(rental.rentalStartPeriod).toLocaleDateString()} -{" "}
                  {new Date(rental.rentalEndPeriod).toLocaleDateString()}
                </Typography>
                <Typography>Price: {rental.customPrice}€</Typography>
                <Typography>Number of Persons: {rental.numberOfPersons}</Typography>
                <Typography
                  variant="subtitle1"
                  style={{ marginTop: "10px" }}
                >
                  Space Owner Details:
                </Typography>
                <Typography>Username: {rental.username}</Typography>
                <Typography>Contact Number: {rental.contactNumber}</Typography>
              </CardContent>
              <Divider style={{ margin: "10px 0" }} />
            </Card>
          ))
        )}
      </Container>
    </ThemeProvider>
  );
};

export default YourRentalsPage;
