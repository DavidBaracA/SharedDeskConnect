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
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";

export const SignInModal = (props) => {
  const dispatch = useDispatch();
  const handleClose = props.onClose;
  const open = props.open;
  const openSignUp = props.onSignUp;
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5100/api/User/GetUsers");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const validateFields = () => {
    let newErrors = {};
    if (!formValues.username) {
      newErrors.username = "Username is required";
    }
    if (!formValues.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) {
      return; // stop here if fields are invalid
    }
    if (isUserAuthenticated(users, formValues.username, formValues.password)) {
      const user = users.find((u) => u.username === formValues.username && u.password === formValues.password);
      if (user) {
        dispatch({
          type: "LOGIN",
          payload: {
            username: user.username,
            currentId: user.userID,
            email: user.email,
            type: user.userType,
          },
        });
        setSnackbarOpen(true);
        handleClose();
      }
    } else {
      setErrors({ auth: "Invalid username or password" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SIGN IN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the form below to log in to your account.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            value={formValues.username}
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
            type="password"
            value={formValues.password}
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          {errors.auth && (
            <FormHelperText error>{errors.auth}</FormHelperText>
          )}
          <FormHelperText sx={{ marginLeft: "15px" }}>
            New user?
            <Button
              onClick={() => {
                handleClose();
                openSignUp();
              }}
              sx={{ fontSize: 10 }}
            >
              Sign up
            </Button>
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>LOG IN</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Logged in successfully"
      />
    </React.Fragment>
  );
};
