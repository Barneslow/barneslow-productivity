import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const settings = ["Contact", "Terms of Service", "Privacy"];

const Footer = () => {
  return (
    <footer>
      <Container
        maxWidth="false"
        sx={{
          background: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
          display: "flex",
          height: "7vh",
          justifyContent: "space-around",
          alignItems: "center",
          borderTop: "1px solid white",
        }}
      >
        <Link to="/terms-of-service">Terms of Service</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/contact">Contact</Link>
      </Container>
    </footer>
  );
};
export default Footer;
