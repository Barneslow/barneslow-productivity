import { useState } from "react";
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

import Modal from "../../components/UI/Modal";
import AccountSettings from "../../components/User/AccountSettings";
import userImage from "../../images/patrick.png";
import UpdateUserProfile from "../../components/User/UpdateUserProfile";
import UpdateUserGoals from "../../components/User/UpdateUserGoals";

import styles from "./UserNavBar.module.css";

import image from "../../images/patrick.png";

const pages = ["Profile", "Settings"];
const settings = ["Profile", "Dashboard", "Settings", "Logout"];

const DUMMY_USER = {
  firstName: "Darrach",
  lastName: "Barneveld",
  userName: "Barneslow",
  email: "test@gmail.com",
  goals: 120,
  password: "123456",
};

const UserNavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showUpdateUserModal, setshowUpdateUserModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

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

  const showModalHandler = (e) => {
    if (e.target.textContent === "Profile") {
      const content = (
        <Modal onClose={closeModal}>
          <AccountSettings />
          <h2 className="ui header">
            <img src={userImage} className="ui circular image" />
            Barneslow
          </h2>
          <UpdateUserProfile onClose={closeModal} user={DUMMY_USER} />
        </Modal>
      );

      setModalContent(content);
    }

    if (e.target.textContent === "Settings") {
      const content = (
        <Modal onClose={closeModal}>
          <UpdateUserGoals onClose={closeModal} />
        </Modal>
      );

      setModalContent(content);
    }

    setshowUpdateUserModal(true);
  };

  const closeModal = (e) => {
    setshowUpdateUserModal(false);
  };

  return (
    <>
      {showUpdateUserModal && modalContent}

      <AppBar position="static">
        <Container
          maxWidth="false"
          sx={{
            background:
              "linear-gradient(138deg, rgba(39,83,247,1) 0%, rgba(7,75,170,1) 60%, rgba(3,21,96,1) 100%)",
            borderBottom: "1px solid white",
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
              className={styles.logo}
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
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
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
                  <Avatar alt="Remy Sharp" src={image} />
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
      </AppBar>
    </>
  );
};
export default UserNavBar;
