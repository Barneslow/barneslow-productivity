import { useState } from "react";
import { forwardRef } from "react";
import TextField from "@mui/material/TextField";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const BasicDatePicker = forwardRef((props, ref) => {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Set A Deadline"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.sendData(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
});

export default BasicDatePicker;
