import styles from "./ViewMoreBtn.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useNavigate } from "react-router-dom";

const ViewMoreBtn = ({ path, setState, setValue }) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    if (path) {
      navigate(`/${path}`);
    } else {
      setState("Sessions");
      setValue(1);
    }
  };

  return (
    <button onClick={navigateHandler} className={styles.button}>
      <span>View More</span>
      <DoubleArrowIcon sx={{ fontSize: { xs: 20, sm: 30, md: 40 } }} />
    </button>
  );
};

export default ViewMoreBtn;
