import React, { useContext } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField
} from "@material-ui/core";

import { SpaceAvailabilityContext } from "./space-availability-board";

export const SpaceAvailabilityParameters = ({ disabled }) => {
  const {
    state: { building, datetime },
    dispatch
  } = useContext(SpaceAvailabilityContext);

  return (
    <div id="space-availability-parameters">
      <FormControl className="space-availability-parameter-formcontrol">
        <InputLabel shrink htmlFor="building-label">
          Building
        </InputLabel>
        <Select
          value={building}
          onChange={event => {
            dispatch({ type: "change-building", value: event.target.value });
          }}
          disabled={disabled}
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
          value={datetime}
          disabled={disabled}
          onChange={event => {
            dispatch({ type: "change-datetime", value: event.target.value });
          }}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
    </div>
  );
};
