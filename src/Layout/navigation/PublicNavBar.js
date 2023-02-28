import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

const PublicNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginGuest } = useSelector(() => authActions);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            background: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            href="/"
            sx={{
              ml: "2rem",
              mr: "2rem",
              display: { xs: "none", md: "flex" },
              fontSize: "2rem",
              fontWeight: 900,
              flexGrow: 1,
            }}
          >
            Barneslow Productivity
          </Typography>

          <Button onClick={() => navigate("/login")} color="inherit">
            Login
          </Button>
          <Button onClick={() => dispatch(loginGuest())} color="inherit">
            Guest
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PublicNavBar;
