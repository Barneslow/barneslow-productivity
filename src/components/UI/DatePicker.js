import { useState } from "react";
import { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers";

export const BasicDatePicker = forwardRef((props, ref) => {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        toolbarPlaceholder
        label="Set A Day"
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

export const BasicTimePicker = forwardRef((props, ref) => {
  const [value, setValue] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Set A Time"
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

export const BasicDateTimePicker = forwardRef((props, ref) => {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Set A Deadline"
        value={value ? value : props.placeholder}
        onChange={(newValue) => {
          setValue(newValue);
          props.sendData(newValue);
        }}
        placeholder={new Date(props.placeholder)}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
});
