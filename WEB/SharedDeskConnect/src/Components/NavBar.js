import * as React from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import SharedDeskConnect from "../Icons/SharedDeskConnect.png";
import profile from "../Icons/profile.png";

import { SignUpModal } from "./SignUpModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { SignInModal } from "./SignInModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
  marginLeft: "-6px",
};

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const currentUserId = useSelector((state) => state.currentUserID);

  const onRentASpaceClick = () => {
    navigate("/listed-spaces");
  };
  const onListASpaceClick = () => {
    if(currentUserId!== null)
    navigate("/list-a-space");
  };


  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };
  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
          overflow: "hidden",
        }}
      >
        <Container maxWidth="1500px">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 91,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
              paddingLeft: "0px",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={SharedDeskConnect}
                style={logoStyle}
                alt="logo of Shared Desk Connect"
                onClick={() => navigate("/")}
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => onRentASpaceClick()}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Find a Desk
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: "6px", px: "12px" }}
                  onClick={() => onListASpaceClick()}
                >
                  <Typography variant="body2" color="text.primary">
                    List your space
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("highlights")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("pricing")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>

            {!isLoggedIn ? (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={() => {
                    handleOpenSignIn();
                  }}
                >
                  Sign in
                </Button>
                <SignInModal open={openSignIn} onClose={handleCloseSignIn} />
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    handleOpenSignUp();
                  }}
                >
                  Sign up
                </Button>
                <SignUpModal open={openSignUp} onClose={handleCloseSignUp} />
              </Box>
            ) : (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <span style={{ color: "black" }}>{currentUser}</span>
                <Avatar src={profile}></Avatar>{" "}
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                  }}
                >
                  Log Out
                </Button>
              </Box>
            )}
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  ></Box>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
