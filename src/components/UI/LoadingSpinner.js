import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CircularProgress size="100%" sx={{ color: "black" }} />
    </Box>
  );
};

export default LoadingSpinner;
