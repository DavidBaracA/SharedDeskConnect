import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { doesUserExist, isStrongPassword } from "./helper";
import { useDispatch } from 'react-redux';

export const SignUpModal = (props) => {

  const dispatch = useDispatch();
  const handleClose = props.onClose;
  const open = props.open;
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    type: "buyer",
  });

  const handleChange = (event) => {
    console.log("🚀 ~ handleChange ~  event.target.value:", event.target.value);
    console.log("🚀 ~ handleChange ~ event.target.name:", event.target.name);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
 
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/User/GetUsers")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        });

      if (!response) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
      
    } catch (error) {
      console.error("Error adding reservation:", error.message);
    }
  };
  const addUser = async (username, password, user_type, email) => {
    try {
      const response = await fetch("http://localhost:5100/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          userType: user_type,
          email: email,
        }),
      });
      if (!response) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
      else {
        const responseData = await response.json();
        const userID = responseData.userID
        const userEmail = responseData.email
        const userType = responseData.userType


        dispatch({type:"LOGIN",payload:{username:username,currentId:userID,email:userEmail,type:userType}})
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (doesUserExist(users, formValues.username)) {
      alert("Username already exists");
    }
    // Validare formular
    else if (
      formValues.username &&
      formValues.password &&
      formValues.confirmPassword &&
      formValues.email &&
      formValues.type &&
      formValues.password === formValues.confirmPassword &&
      isStrongPassword(formValues.password)
    ) {
      console.log("userul a fost registrat cu succes:", formValues);
      addUser(
        formValues.username,
        formValues.password,
        formValues.type,
        formValues.email
      );
      handleClose();
    } else {
      alert("Some fields are not accepted(change later)!");
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the form below to register an acccout.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            value={formValues.username}
            type="username"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            value={formValues.password}
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Pasword"
            value={formValues.confirmPassword}
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            value={formValues.email}
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <div style={{ marginTop: "16px" }}>
            <Select
              labelId="demo-simple-select-label"
              id="type"
              name="type"
              value={formValues.type}
              label="type"
              onChange={handleChange}
              variant="standard"
            >
              <MenuItem value={"buyer"}>Rent a desk</MenuItem>
              <MenuItem value={"renter"}>List a Space</MenuItem>
              <MenuItem value={"buyerAndRenter"}>Both</MenuItem>
            </Select>
            <FormHelperText>Reason for using our website?</FormHelperText>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
