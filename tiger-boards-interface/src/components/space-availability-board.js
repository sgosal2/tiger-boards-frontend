import React, { useReducer } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { SpaceAvailabilityParameters } from "./space-availability-parameters";
import currentDateTime from "../utilities/current-date-time";
import spaceAvailabilityReducer from "../reducers/space-availability-reducer";
import useDataApi from "../utilities/use-data-api";
import config from "../config.json";

export const SpaceAvailabilityContext = React.createContext();

// Don't use this.
const dummyData = [
  {
    space_id: "CTC 113",
    is_available: true
  },
  {
    space_id: "CTC 114",
    is_available: false
  },
  {
    space_id: "CTC 115",
    is_available: true
  }
];

const formatAvailabilityData = availabilityData =>
  availabilityData.map(data => {
    return (
      <TableRow hover key={data.space_id}>
        <TableCell
          className="space-id-cell"
          onClick={() => alert(data.space_id)}
        >
          {data.space_id}
        </TableCell>
        <TableCell>
          {data.is_available ? "Available" : "Not Available"}
        </TableCell>
      </TableRow>
    );
  });

const initialState = {
  building: config.DEFAULT_BUILDING,
  datetime: currentDateTime(),
  data: {}
};

export const SpaceAvailabilityBoard = () => {
  const { data, isLoading, isError, doFetch } = useDataApi(config.API_SPACES);
  const [state, dispatch] = useReducer(spaceAvailabilityReducer, initialState);

  return (
    <div id="space-availability-board">
      <SpaceAvailabilityContext.Provider value={{ state, dispatch }}>
        <SpaceAvailabilityParameters />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Space</TableCell>
              <TableCell>Availability</TableCell>
            </TableRow>
          </TableHead>
          {/* Replace dummyData with data from state */}
          <TableBody>{formatAvailabilityData(dummyData)}</TableBody>
        </Table>
      </SpaceAvailabilityContext.Provider>
    </div>
  );
};

export default SpaceAvailabilityBoard;
