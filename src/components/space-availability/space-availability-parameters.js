import React, { useContext } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField
} from "@material-ui/core";

import { SpaceAvailabilityContext } from "./space-availability-board";
import useDataApi from "../../utilities/use-data-api";
import config from "../../config.json";

export const SpaceAvailabilityParameters = ({ disabled }) => {
  const {
    state: { building, datetime },
    dispatch
  } = useContext(SpaceAvailabilityContext);

  const buildingsApi = useDataApi(config.API_BUILDINGS);

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
          disabled={disabled || buildingsApi.isLoading}
          name="building"
        >
          {buildingsApi.isLoading ? (
            <MenuItem value="null">Loading...</MenuItem>
          ) : (
            buildingsApi.data.map(buildingData => {
              return (
                <MenuItem
                  key={buildingData.building_id}
                  value={buildingData.building_id}
                >
                  {buildingData.building_name}
                </MenuItem>
              );
            })
          )}
        </Select>
      </FormControl>
      <FormControl className="space-availability-parameter-formcontrol">
        <TextField
          id="space-availability-date-field"
          label="Date and Time"
          type="datetime-local"
          value={datetime}
          disabled={disabled}
          onChange={event =>
            dispatch({ type: "change-datetime", value: event.target.value })
          }
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
    </div>
  );
};
