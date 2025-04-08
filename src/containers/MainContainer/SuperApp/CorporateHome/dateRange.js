import React, { useState } from "react";
import { Grid, Typography, Stack } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./dateRange.module.css";

export default function DateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // console.log(startDate, endDate);
  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <Grid className={classes.mainGrid} container>
      <Stack spacing={2}>
        <div>
          <Typography variant="subtitle1">Start Date:</Typography>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange(date, "start")}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select start date"
            className={classes.startDate}
          />
        </div>
        <div>
          <Typography variant="subtitle1">End Date:</Typography>
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange(date, "end")}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select end date"
            className={classes.endDate}
          />
        </div>
      </Stack>
    </Grid>
  );
}
