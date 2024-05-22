import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import NavBar from "../../Components/NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import "./ListYourSpacePage.css";
import ImageUploader from "../../Components/ImageUploader";
import CheckboxList from "../../Components/CheckboxList";
import WifiIcon from "@mui/icons-material/Wifi";
import HearingIcon from "@mui/icons-material/Hearing";
import PrintIcon from "@mui/icons-material/Print";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const ListYourSpacePage = () => {
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
  const [images, setImages] = React.useState([]);
  const [additionalBenefit, setAdditionalBenefit] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAdditionalBenefitChange = (e) => {
    setAdditionalBenefit(e.target.value);
  };

  const currentUserId = useSelector((state) => state.currentUserID);

  const [selectedBenefits, setSelectedBenefits] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleBenefitToggle = (index) => {
    setSelectedBenefits((prevBenefits) => {
      const newBenefits = [...prevBenefits];
      newBenefits[index] = !prevBenefits[index];
      return newBenefits;
    });
  };

  const benefitItems = [
    { label: "Free Wifi", icon: <WifiIcon /> },
    { label: "24/7 access", icon: <AccessTimeIcon /> },
    { label: "Quiet workspace environment", icon: <HearingIcon /> },
    { label: "Access to printing facilities", icon: <PrintIcon /> },
    { label: "Accessible parking", icon: <DirectionsCarFilledIcon /> },
    { label: "Free coffee/drinks", icon: <CoffeeMakerIcon /> },
    { label: "Game room", icon: <SportsEsportsIcon /> },
  ];

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    price: 0,
    maxCapacity: 0,
    availableCapacity: 0,
    description: "",
    address: "",
    contactNumber: "",
    benefits: [],
  });

  const handleImageUpload = async (spaceId) => {
    try {
      const formData = new FormData();
      images.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(
        `http://localhost:5100/api/Space/${spaceId}/UploadImages`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }
      setImages([]);
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to upload images");
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name) errors.name = "Name is required";
    if (!formData.city) errors.city = "City is required";
    if (formData.price <= 0) errors.price = "Price must be greater than 0";
    if (formData.maxCapacity <= 0)
      errors.maxCapacity = "Max capacity must be greater than 0";
    if (formData.availableCapacity < 0)
      errors.availableCapacity = "Available capacity cannot be negative";
    if (formData.availableCapacity > formData.maxCapacity)
      errors.availableCapacity =
        "Available capacity cannot greater then maximum capacity";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.contactNumber)
      errors.contactNumber = "Contact number is required";
    if (formData.contactNumber.length !== 10)
      errors.contactNumber = "Contact must have 10 digits";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please correct the errors in the form");
      setSnackbarOpen(true);
      return;
    }

    try {
      const selectedBenefitItems = benefitItems.filter(
        (item, index) => selectedBenefits[index]
      );

      let selectedBenefitLabels = selectedBenefitItems.map(
        (item) => item.label
      );

      if (additionalBenefit !== "") {
        selectedBenefitLabels.push(additionalBenefit);
      }
      const stringBenefits = selectedBenefitLabels.join(",");
      const updatedFormData = {
        ...formData,
        benefits: stringBenefits,
        renterUserId: currentUserId,
      };

      const response = await fetch("http://localhost:5100/api/Space", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to add space");
      }

      const responseData = await response.json();
      const newSpaceId = responseData.spaceID;

      await handleImageUpload(newSpaceId);

      setFormData({
        name: "",
        city: "",
        price: 0,
        maxCapacity: 0,
        availableCapacity: 0,
        description: "",
        address: "",
        contactNumber: "",
        benefits: [],
      });

      navigate("/your-spaces");
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to add space");
      setSnackbarOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <form className={"list-you-space"} onSubmit={handleSubmit}>
        <Typography variant="body2" sx={{ color: "grey.400", fontSize: 30 }}>
          Add your space
        </Typography>
        <TextField
          label="Your space name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          variant="outlined"
          error={!!formErrors.city}
          helperText={formErrors.city}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          variant="outlined"
          error={!!formErrors.price}
          helperText={formErrors.price}
        />
        <TextField
          label="Maximum Capacity"
          name="maxCapacity"
          type="number"
          value={formData.maxCapacity}
          onChange={handleChange}
          variant="outlined"
          error={!!formErrors.maxCapacity}
          helperText={formErrors.maxCapacity}
        />
        <TextField
          label="Current available capacity"
          name="availableCapacity"
          type="number"
          value={formData.availableCapacity}
          onChange={handleChange}
          variant="outlined"
          error={!!formErrors.availableCapacity}
          helperText={formErrors.availableCapacity}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
        />
        <TextField
          label="Space address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
          error={!!formErrors.address}
          helperText={formErrors.address}
        />
        <TextField
          label="Contact number"
          name="contactNumber"
          type="number"
          value={formData.contactNumber}
          onChange={handleChange}
          variant="outlined"
          error={!!formErrors.contactNumber}
          helperText={formErrors.contactNumber}
        />
        <Typography variant="body1" sx={{ color: "Black", fontSize: 20 }}>
          Your Space Facilities
        </Typography>
        <CheckboxList
          items={benefitItems}
          selectedItems={selectedBenefits}
          onItemToggle={handleBenefitToggle}
        />
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Additional Facilities</Typography>
          <TextField
            label="Optional"
            value={additionalBenefit}
            onChange={handleAdditionalBenefitChange}
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
          />
        </div>
        <Typography variant="body1" sx={{ color: "Black", fontSize: 20 }}>
          Add your Images here
        </Typography>
        <div>
          <ImageUploader onUpload={setImages} />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
};
