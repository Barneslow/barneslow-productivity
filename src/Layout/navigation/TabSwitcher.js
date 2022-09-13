import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabSwitcher = ({ setViewable, setValue, value }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0) {
      setViewable("Dashboard");
    } else if (newValue === 1) {
      setViewable("Sessions");
    } else if (newValue === 2) {
      setViewable("User");
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
      <Tabs onChange={handleChange} value={value}>
        <Tab sx={{ color: "black" }} label="Dashboard" />
        <Tab sx={{ color: "black" }} label="Sessions" />
        <Tab sx={{ color: "black" }} label="User" />
      </Tabs>
    </Box>
  );
};

export default TabSwitcher;
