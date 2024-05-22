import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Switch,
  Tooltip,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavBar from "../../Components/NavBar";
import { useSelector } from "react-redux";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import BenefitsList from "../../Components/BenefitsList";
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
  const [notifyOnChange, setNotifyOnChange] = useState(false); // New state for notification preference

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const currentUserId = useSelector((state) => state.currentUserID);
  const currentUserEmail = useSelector((state) => state.currentUserEmail); // Assuming you have user email in the state
  console.log("email", currentUserEmail);
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

  const updateSpaceAvailability = async () => {
    try {
      const response = await fetch(
        `http://localhost:5100/api/Notification/UpdateAvailability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SpaceId: cleanedId,
            NewCapacity: spaceDetails.availableCapacity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(
          "Failed to update space availability and send notifications"
        );
      }
      setSnackbarMessage("Available capacity updated successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(
        "Error updating space availability and sending notifications:",
        error.message
      );
      setSnackbarMessage(
        "Failed to update available capacity and send notifications"
      );
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const fetchNotificationPreference = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/api/Notification/Notify?spaceId=${Number(
            cleanedId
          )}&userId=${currentUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notification preference");
        }
        const data = await response.json();
        setNotifyOnChange(data.notify);
      } catch (error) {
        console.error("Error fetching notification preference:", error.message);
      }
    };

    fetchNotificationPreference();
  }, [cleanedId, currentUserId]);

  const handleNotifyChange = async (checked) => {
    try {
      const notificationData = {
        SpaceId: String(cleanedId),
        UserId: String(currentUserId),
        Email: currentUserEmail,
      };
      const notifyResponse = await fetch(
        `http://localhost:5100/api/Notification/Notify`,
        {
          method: checked ? "POST" : "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        }
      );
      if (!notifyResponse.ok) {
        throw new Error("Failed to set notification preference");
      }
      setNotifyOnChange(checked);
      setSnackbarMessage(
        checked ? "Notification enabled" : "Notification disabled"
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error setting notification preference:", error.message);
      setSnackbarMessage("Failed to update notification preference");
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
          <Button
            onClick={handleBackButton}
            color="primary"
            variant="contained"
          >
            {editMode ? "Back to Your Spaces" : "Back to Listed Spaces"}
          </Button>
        </div>
        <div className="container">
          <div className="left-side-styling">
            <ImageGallery
              showPlayButton={false}
              showBullets
              showIndex
              showNav
              items={imageList}
            />
            <div className="description-box">
              <p>Description: {spaceDetails.description}</p>
            <BenefitsList items={spaceDetails.benefits.split(",")} />

            </div>
          </div>
          <div className="space-details">
            <h2 style={{ margin: 0 }}>{spaceDetails.name}</h2>
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
              <div>
                <p>Available Capacity: {spaceDetails.availableCapacity}</p>
                {spaceDetails.availableCapacity !== undefined &&
                  spaceDetails.availableCapacity === 0 && (
                    <div className="switch-container">
                      <Tooltip title="Send me a notification mail when this is available">
                        <InfoIcon />
                      </Tooltip>
                      <Switch
                        checked={notifyOnChange}
                        onChange={(e) => handleNotifyChange(e.target.checked)}
                      />
                    </div>
                  )}
              </div>
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
              <Button
                onClick={updateSpaceAvailability}
                color="primary"
                variant="contained"
              >
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
            severity={
              snackbarMessage.includes("successfully") ||
              snackbarMessage.includes("enabled")
                ? "success"
                : "error"
            }
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
};
