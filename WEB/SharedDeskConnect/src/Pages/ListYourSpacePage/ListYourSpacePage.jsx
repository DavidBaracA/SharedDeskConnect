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
import ImageUploader from "../../Components/ImageUploader"; // Import ImageUploader component
import CheckboxList from "../../Components/CheckboxList"; // Import ImageUploader component
import WifiIcon from "@mui/icons-material/Wifi";
import { useNavigate } from "react-router-dom";

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

  // Define an array of objects containing labels and icons for each checkbox item
  const benefitItems = [
    { label: "Free Wifi", icon: <WifiIcon /> },
    { label: "24/7 access", icon: <WifiIcon /> },
    { label: "Quiet workspace environment", icon: <WifiIcon /> },
    { label: "Access to printing facilitiest", icon: <WifiIcon /> },
    { label: "Accessible parking", icon: <WifiIcon /> },
    { label: "Free coffe/drinks", icon: <WifiIcon /> },
    { label: "Game room", icon: <WifiIcon /> },
  ];

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    price: 0,
    maxCapacity: 0,
    currentCapacity: 0,
    description: "",
    address: "",
    contactNumber: "",
    benefits: [],
  });

  const handleImageUpload = async (spaceId) => {
    try {
      const formData = new FormData();
      // Append each selected file to the FormData object
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
      // Optionally, clear images state or perform any other actions
      setImages([]);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors, show error messages, etc.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // Filter the benefit items based on selected checkboxes
   

    e.preventDefault();
    try {
      const selectedBenefitItems = benefitItems.filter(
        (item, index) => selectedBenefits[index]
      );
      
  
      // Extract the labels of the selected benefit items
      let selectedBenefitLabels = selectedBenefitItems.map((item) => item.label);
  
      if (additionalBenefit !== "") {
        selectedBenefitLabels.push(additionalBenefit);
      }
      const stringBenefits = selectedBenefitLabels.join(",")
      // Update the formData object to include the selected benefits
      const updatedFormData = {
        ...formData,
        benefits: stringBenefits,
        renterUserId: currentUserId,
  
      };
  
      
      console.log("formsubmit:", updatedFormData);
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
      const newSpaceId = responseData.spaceID; // Extract the ID from the response

      // Call handleImageUpload function to upload images associated with the new space
      await handleImageUpload(newSpaceId);

      // If successful, clear form data or perform any other actions
      setFormData({
        name: "",
        city: "",
        price: 0,
        maxCapacity: 0,
        currentCapacity:0,
        description: "",
        address: "",
        contactNumber: "",
        benefits: [],
      });
      navigate("/listed-spaces"); // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.error("Error:", error);
      // Handle errors, show error messages, etc.
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
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Maximum Capacity"
          name="maxCapacity"
          type="number"
          value={formData.maxCapacity}
          onChange={handleChange}
          variant="outlined"
        />
         <TextField
          label="Curent tenants"
          name="currentCapacity"
          type="number"
          value={formData.currentCapacity}
          onChange={handleChange}
          variant="outlined"
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
        />
        <TextField
          label="Contact number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          variant="outlined"
          multiline
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
          {/* Integrate ImageUploader component and pass onUpload callback */}
          <ImageUploader onUpload={setImages} />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </ThemeProvider>
  );
};
