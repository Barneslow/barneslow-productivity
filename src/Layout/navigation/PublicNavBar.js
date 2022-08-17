import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PublicNavBar = () => {
  const navigate = useNavigate();

  const handleLoginNavigation = () => navigate("/login");

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

          <Button onClick={handleLoginNavigation} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PublicNavBar;
