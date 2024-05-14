import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./SpaceDetails.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { createTheme } from "@mui/material";
import NavBar from "../../Components/NavBar";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom";

export const SpaceDetailsPage = () => {
  const darkBlueBase = "#041f60";
  const purple = "#5b5299";
  const lightPurple = "#a6b6f8";
  const { id } = useParams();
  const cleanedId = id.substring(1);
  const [imageList, setImageList] = useState([]);
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [contactExpanded, setContactExpanded] = useState(false); // State for contact accordion
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editMode = searchParams.get("editMode");

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

    return () => {
      // Cleanup function if needed
    };
  }, []);

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
  }, []);

  const handleBackButton = () => {
    !editMode ? navigate("/listed-spaces") : navigate("/your-spaces");
  };

  const handleContactClick = () => {
    setContactExpanded(!contactExpanded);
  };

  
  const handleAvailableCapacityChange = (event) => {
    // Update the available capacity in state
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
    } catch (error) {
      console.error("Error updating space details:", error.message);
    }
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
          <Button
            onClick={handleBackButton}
            color="primary"
            variant="contained"
          >
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
            <h2>{spaceDetails.name}</h2>
            <div className="description-box">
              <p>Description: {spaceDetails.description}</p>
            </div>
            <p>City: {spaceDetails.city}</p>
            <p>Address: {spaceDetails.address}</p>
            <p>Price: {spaceDetails.price}</p>
            {editMode ? (
              <TextField
                id="availableCapacity"
                label="Available Capacity"
                variant="outlined"
                fullWidth
                value={spaceDetails.availableCapacity}
                onChange={handleAvailableCapacityChange}
                disabled={!editMode}
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
                <Typography>Contact </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Owner Contact Number: {spaceDetails.contactNumber}
                </Typography>
              </AccordionDetails>
            </Accordion>
            {editMode && (
            <Button
              onClick={updateSpaceDetails}
              color="primary"
              variant="contained"
            >
              Save Changes
            </Button>
          )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};
