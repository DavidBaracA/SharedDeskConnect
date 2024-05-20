import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavBar from "../../Components/NavBar";
import PhoneIcon from "@mui/icons-material/Phone";
import "./SpaceDetails.css";
import "react-image-gallery/styles/css/image-gallery.css";

export const SpaceDetailsPage = () => {
  const darkBlueBase = "#041f60";
  const purple = "#5b5299";
  const lightPurple = "#a6b6f8";
  const { id } = useParams();
  const cleanedId = id.substring(1);
  const [imageList, setImageList] = useState([]);
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [contactExpanded, setContactExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const isEdit = searchParams.get("editMode");
    setEditMode(isEdit === "true");
  }, [searchParams]);

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/api/Space/${cleanedId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch space details");
        }
        const data = await response.json();
        setSpaceDetails(data);
      } catch (error) {
        console.error("Error fetching space details:", error.message);
      }
    };

    fetchSpaceDetails();
  }, [cleanedId]);

  const getImages = async (cleanedId) => {
    try {
      const response = await fetch(
        `http://localhost:5100/api/Space/${cleanedId}/Images`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const formattedImages = data.map((imageContent) => ({
        original: `data:image/jpeg;base64,${imageContent}`,
        thumbnail: `data:image/jpeg;base64,${imageContent}`,
      }));

      setImageList(formattedImages);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  useEffect(() => {
    getImages(cleanedId);
  }, [cleanedId]);

  const handleBackButton = useCallback(() => {
    navigate(editMode ? "/your-spaces" : "/listed-spaces");
  }, [editMode, navigate]);

  const handleContactClick = () => {
    setContactExpanded(!contactExpanded);
  };

  const handleAvailableCapacityChange = (event) => {
    setSpaceDetails((prevSpaceDetails) => ({
      ...prevSpaceDetails,
      availableCapacity: event.target.value,
    }));
  };

  const updateSpaceDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5100/api/Space/${cleanedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(spaceDetails),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update space details");
      }
      setSnackbarMessage("Available capacity updated successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating space details:", error.message);
      setSnackbarMessage("Failed to update available capacity");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!spaceDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: {
              main: darkBlueBase,
            },
            secondary: {
              main: purple,
              light: lightPurple,
            },
          },
        })}
      >
        <CssBaseline />
        <NavBar />
        <div className="button-container">
          <Button onClick={handleBackButton} color="primary" variant="contained">
            {editMode ? "Back to Your Spaces" : "Back to Listed Spaces"}
          </Button>
        </div>
        <div className="container">
          <div className="gallery-styling">
            <ImageGallery
              showPlayButton={false}
              showBullets
              showIndex
              showNav
              items={imageList}
            />
          </div>
          <div className="space-details">
            <h2 style={{ margin: 0 }}>{spaceDetails.name}</h2>
            <div className="description-box">
              <p>Description: {spaceDetails.description}</p>
            </div>
            <p>City: {spaceDetails.city}</p>
            <p>Address: {spaceDetails.address}</p>
            <p>Price: {spaceDetails.price + "\u20AC"}</p>
            <p>Maximum Capacity: {spaceDetails.maxCapacity}</p>
            {editMode ? (
              <TextField
                id="availableCapacity"
                label="Available Capacity"
                variant="outlined"
                fullWidth
                value={spaceDetails.availableCapacity}
                onChange={handleAvailableCapacityChange}
              />
            ) : (
              <p>Available Capacity: {spaceDetails.availableCapacity}</p>
            )}
            <Accordion expanded={contactExpanded} onChange={handleContactClick}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="contact-details-content"
                id="contact-details-header"
              >
                <Typography>Contact Number</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span style={{ paddingRight: 5 }}>
                    <PhoneIcon fontSize={"10px"} />
                  </span>
                  {spaceDetails.contactNumber}
                </Typography>
              </AccordionDetails>
            </Accordion>
            {editMode && (
              <Button onClick={updateSpaceDetails} color="primary" variant="contained">
                Save Changes
              </Button>
            )}
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarMessage.includes("successfully") ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
};
