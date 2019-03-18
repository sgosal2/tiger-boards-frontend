import React from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField
} from "@material-ui/core";

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
        {/* TODO: set defaultValue to current date time */}
        <TextField
          id="space-availability-date-field"
          label="Date"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
    </div>
  );
};
