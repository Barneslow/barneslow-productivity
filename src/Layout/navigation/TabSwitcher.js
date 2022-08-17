import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabSwitcher = (props) => {
  const [viewable, setViewable] = useState(0);
  const handleChange = (event, newValue) => {
    setViewable(newValue);

    if (newValue === 0) {
      props.view("Dashboard");
    } else if (newValue === 1) {
      props.view("Sessions");
    } else if (newValue === 2) {
      props.view("User");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid grey",
        background: "lightgrey",
      }}
    >
      <Tabs onChange={handleChange} value={viewable}>
        <Tab sx={{ color: "black" }} label="Dashboard" />
        <Tab sx={{ color: "black" }} label="Sessions" />
        <Tab sx={{ color: "black" }} label="User" />
      </Tabs>
    </Box>
  );
};

export default TabSwitcher;
