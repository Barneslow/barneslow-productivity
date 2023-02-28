import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PunchClockIcon from "@mui/icons-material/PunchClock";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

const pages = ["Dashboard", "Study", "Tasks", "Register"];
const settings = ["Dashboard", "Study", "Tasks", "Logout"];

const GuestNavBar = ({ userAuth, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logoutGuest } = useSelector(() => authActions);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  let profilePhoto;
  if (user) {
    profilePhoto = user?.profilePhoto;
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    if (e.target.textContent === "Tasks") navigate("/tasks");
    if (e.target.textContent === "Dashboard") navigate("/");
    if (e.target.textContent === "Study") navigate("/study");
    if (e.target.textContent === "Logout") {
      dispatch(logoutGuest());
      navigate("/login");
    }

    setAnchorElUser(null);
  };

  const showModalHandler = (e) => {
    if (e.target.textContent === "Dashboard") {
      navigate("/");
    }

    if (e.target.textContent === "Tasks") {
      navigate("/tasks");
    }

    if (e.target.textContent === "Study") {
      navigate("/study");
    }

    if (e.target.textContent === "Register") {
      dispatch(logoutGuest());
      navigate("/login");
    }
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="false"
        sx={{
          background: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
        }}
      >
        <Toolbar disableGutters>
          <PunchClockIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "inherit",
              fontSize: "3rem",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: "2rem",
              mr: "2rem",
              display: { xs: "none", md: "flex" },
              fontSize: "2rem",
              fontWeight: 900,
            }}
          >
            Barneslow Productivity
          </Typography>

          {/* MEDIA QUERIES - RESPONSIVE DESIGN */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClick={showModalHandler}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontSize: "2rem",
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            BP
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                variant="outlined"
                onClick={showModalHandler}
                sx={{
                  backgroundColor: "white",
                  margin: ".2rem",
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    // boxShadow: "var(--white-box-shadow)",
                    border: 1,
                    borderColor: "white",
                  }}
                  alt="Guest Account"
                  src={profilePhoto}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          background: "#3aba45",
          paddingBlock: 1,
          paddingInline: 2,
          color: "black",
        }}
      >
        Guest Account. Register for saved details, greater tracking
        capabilities, leaderboard and shop access!
      </Typography>
    </AppBar>
  );
};
export default GuestNavBar;
