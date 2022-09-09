import styles from "./ViewMoreBtn.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useNavigate } from "react-router-dom";

const ViewMoreBtn = ({ path }) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/${path}`);
  };

  return (
    <button onClick={navigateHandler} className={styles.button}>
      <span>View More</span> <DoubleArrowIcon />
    </button>
  );
};

export default ViewMoreBtn;
