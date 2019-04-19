import React, { useReducer, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { SpaceAvailabilityParameters } from "./space-availability-parameters";
import currentDateTime from "../../utilities/current-date-time";
import spaceAvailabilityReducer from "../../reducers/space-availability-reducer";
import useDataApi from "../../utilities/use-data-api";
import config from "../../config.json";
import SpaceAvailabilityBody from "./space-availability-body";

export const SpaceAvailabilityContext = React.createContext();

const initialState = {
  building: config.DEFAULT_BUILDING,
  datetime: currentDateTime(),
  data: []
};

export const SpaceAvailabilityBoard = () => {
  const [state, dispatch] = useReducer(spaceAvailabilityReducer, initialState);
  const { data, isLoading, isError, doFetch } = useDataApi({});

  const urlParams = `?building_id=${state.building}`;
  const url = `${config.API_SPACES}${urlParams}`;

  useEffect(() => {
    doFetch(url);
  }, [url]);

  useEffect(() => {
    if (!isError || !isLoading) {
      dispatch({ type: "change-data", value: data });
    }
  }, [data]);

  return (
    <div id="space-availability-board">
      <SpaceAvailabilityContext.Provider value={{ state, dispatch }}>
        <SpaceAvailabilityParameters disabled={isLoading} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Space</TableCell>
              <TableCell>Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <SpaceAvailabilityBody availabilityData={state.data} />
          </TableBody>
        </Table>
      </SpaceAvailabilityContext.Provider>
    </div>
  );
};

export default SpaceAvailabilityBoard;
