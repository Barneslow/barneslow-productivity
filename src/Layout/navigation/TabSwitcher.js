import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const grey = "#242526;";

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
        borderRadius: 1,
        background: "lightblue",
      }}
    >
      <Tabs onChange={handleChange} value={viewable}>
        <Tab sx={{ color: grey }} label="Dashboard" />
        <Tab sx={{ color: grey }} label="Sessions" />
        <Tab sx={{ color: grey }} label="User" />
      </Tabs>
    </Box>
  );
};

export default TabSwitcher;
