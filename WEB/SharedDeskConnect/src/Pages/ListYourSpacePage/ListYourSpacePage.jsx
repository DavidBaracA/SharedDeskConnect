import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import NavBar from "../../Components/NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import React, { useState } from "react";

import "./ListYourSpacePage.css";
import { UploadComponent } from "../../Components/UploadComponent";

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

  const [images, setImages] = React.useState([]);
  console.log("🚀 ~ ListYourSpacePage ~ images:", images)


  const [formData, setFormData] = useState({
    name: "",
    city: "",
    price: 0,
    maxCapacity: 0,
    description: "",
    address: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can send formData to an API endpoint or perform any other action
    console.log(formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <form className={"list-you-space"} onSubmit={handleSubmit}>
        <Typography
          variant="body2
        "
          sx={{ color: "grey.400", fontSize: 30 }}
        >
          Add you space
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
        <Typography variant="body1" sx={{ color: "Black", fontSize: 20 }}>
          Add your Images here
        </Typography>
        <div>
          <UploadComponent setImages={setImages} images={images} />
        </div>
        <Button  variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </ThemeProvider>
  );
};
