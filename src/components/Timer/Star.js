import GradeIcon from "@mui/icons-material/Grade";
import { IconButton } from "@mui/material";

const Star = (props) => {
  if (props.rating) {
    return (
      <IconButton onClick={props.onClick}>
        <GradeIcon
          sx={{ color: "gold", fontSize: 60, stroke: "black", strokeWidth: 1 }}
        />
      </IconButton>
    );
  } else {
    return (
      <IconButton onClick={props.onClick}>
        <GradeIcon
          sx={{ color: "grey", fontSize: 60, stroke: "black", strokeWidth: 1 }}
        />
      </IconButton>
    );
  }
};

export default Star;
