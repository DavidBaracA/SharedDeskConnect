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
import { useDispatch } from "react-redux";

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
    type: "buyerAndRenter",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    // Clear errors on new input
    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  };

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/User/GetUsers")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (doesUserExist(users, formValues.username)) {
      newErrors.username = "Username already exists";
      valid = false;
    }

    if (!formValues.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!formValues.email.includes(".com")) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!isStrongPassword(formValues.password)) {
      newErrors.password = "Password is not strong enough";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      addUser(
        formValues.username,
        formValues.password,
        formValues.type,
        formValues.email
      );
      handleClose();
    } else {
      return 0;
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

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const responseData = await response.json();
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          currentId: responseData.userID,
          email: responseData.email,
          type: responseData.userType,
        },
      });
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the form below to register an account.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            value={formValues.username}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
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
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formValues.confirmPassword}
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            value={formValues.email}
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <div style={{ marginTop: "16px" }}>
            <p>User type:</p>
            <Select
              labelId="demo-simple-select-label"
              id="type"
              name="type"
              value={formValues.type}
              onChange={handleChange}
              variant="standard"
            >
              <MenuItem value="buyer">Renter</MenuItem>
              <MenuItem value="renter">Space Owner</MenuItem>
              <MenuItem value="buyerAndRenter">Renter and Space Owner</MenuItem>
            </Select>
            <FormHelperText>
              {formValues.type === "buyer" || formValues.type === "renter"
                ? "(This will restrict the functionalities available to you within the application.)"
                : ""}
            </FormHelperText>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
