import React from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField
} from "@material-ui/core";

const currentDateTime = () => {
  /* Required format is yyyy-MM-ddThh:mm */

  const today = new Date();
  let month = today.getMonth() + 1;
  month = month >= 10 ? month : `0${month}`;
  let currDate = today.getDate();
  currDate = currDate >= 10 ? currDate : `0${currDate}`;
  const date = `${today.getFullYear()}-${month}-${currDate}`;

  let hour = today.getHours();
  hour = hour >= 10 ? hour : `0${hour}`;
  let minutes = today.getMinutes();
  minutes = minutes >= 10 ? minutes : `0${minutes}`;
  const time = `${hour}:${minutes}`;

  const datetime = `${date}T${time}`;
  return datetime;
};

export const SpaceAvailabilityParameters = () => {
  return (
    <div id="space-availability-parameters">
      <FormControl className="space-availability-parameter-formcontrol">
        <InputLabel shrink htmlFor="building-label">
          Building
        </InputLabel>
        <Select
          // TODO: Change this to read building value from state
          value="Chambers"
          // TODO: Change this to set building state to event.target.value
          onChange={event => {
            alert(event.target.value);
          }}
          name="building"
        >
          {/* TODO: Create a generator to generate these menuitems from data in
           state. Do not leave these here. */}
          <MenuItem value="Chambers">Chambers</MenuItem>
          <MenuItem value="Anderson">Anderson</MenuItem>
          <MenuItem value="Khoury">Khoury</MenuItem>
          <MenuItem value="Baun">Baun</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="space-availability-parameter-formcontrol">
        <TextField
          id="space-availability-date-field"
          label="Date and Time"
          type="datetime-local"
          defaultValue={currentDateTime()}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
    </div>
  );
};
