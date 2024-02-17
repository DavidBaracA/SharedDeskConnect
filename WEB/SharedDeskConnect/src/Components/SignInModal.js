import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { isUserAuthenticated } from "./helper";
import { useDispatch } from "react-redux";

export const SignInModal = (props) => {
  const dispatch = useDispatch();
  const handleClose = props.onClose;
  const open = props.open;
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
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
  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DOO
    // ADD VALIDATION ON SIGN IN
    if (formValues.username && formValues.password) {
      if (
        isUserAuthenticated(users, formValues.username, formValues.password)
      ) {
        dispatch({ type: "LOGIN", payload: formValues.username });
        handleClose();
      }
    } else {
      alert("Some fields are not accepted(change later)!");
    }
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SIGN IN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the form below to log in your account.
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            LOG IN
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
