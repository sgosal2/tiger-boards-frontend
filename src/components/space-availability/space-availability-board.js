import React, { useState, useReducer, useEffect, Suspense } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

  const [modalOpen, setModalOpen] = useState(false);
  const [currentlySelectedSpace, setCurSelectedSpace] = useState("");
  const handleModalOpen = space_id => {
    setCurSelectedSpace(space_id);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

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
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="space-details-dialog-title"
      >
        <DialogTitle id="login-dialog-title">
          {currentlySelectedSpace}
        </DialogTitle>
        <DialogContent>Capacity: Example</DialogContent>
        <DialogContent>
          <DialogContent>Example feature 1</DialogContent>
          <DialogContent>Example feature 2</DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>{" "}
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
            <SpaceAvailabilityBody
              availabilityData={state.data}
              handleModalOpen={space_id => {
                handleModalOpen(space_id);
              }}
            />
          </TableBody>
        </Table>
      </SpaceAvailabilityContext.Provider>
    </div>
  );
};

export default SpaceAvailabilityBoard;
