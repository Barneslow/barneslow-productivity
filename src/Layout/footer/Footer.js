import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Link, Typography } from "@mui/material";
import { display } from "@mui/system";

const settings = ["Contact", "Terms of Service", "Privacy"];

const Footer = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <footer>
      <Container
        maxWidth="false"
        sx={{
          background:
            "linear-gradient(138deg, rgba(77,77,79,1) 0%, rgba(138,139,140,1) 60%, rgba(77,77,79,1) 100%)",
          display: "flex",
          height: "7vh",
          justifyContent: "space-around",
          alignItems: "center",
          borderTop: "1px solid white",
        }}
      >
        <Typography
          noWrap
          component="a"
          href="/"
          sx={{
            ml: "2rem",
            mr: "2rem",
            display: { xs: "none", md: "flex" },
            fontSize: "1rem",
            fontWeight: 900,
            borderBottom: "1px solid white",
          }}
        >
          Terms of Service
        </Typography>
        <Typography
          noWrap
          component="a"
          href="/"
          sx={{
            ml: "2rem",
            mr: "2rem",
            display: { xs: "none", md: "flex" },
            fontSize: "1rem",
            fontWeight: 900,
            borderBottom: "1px solid white",
          }}
        >
          Privacy
        </Typography>{" "}
        <Typography
          noWrap
          component="a"
          href="/"
          sx={{
            ml: "2rem",
            mr: "2rem",
            display: { xs: "none", md: "flex" },
            fontSize: "1rem",
            fontWeight: 900,
            borderBottom: "1px solid white",
          }}
        >
          Contact
        </Typography>
      </Container>
    </footer>
  );
};
export default Footer;
