import React, { useState, useReducer, useEffect } from "react";
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

const dummySpaceDetailData = {
  capacity: 25,
  features: ["Whiteboard", "Projector"]
};

const formatAvailabilityData = (
  availabilityData,
  spaceDetailData,
  modalOpen,
  handleModalOpen,
  handleModalClose
) => {
  return availabilityData.map(data => {
    return (
      <TableRow hover key={data.space_id}>
        <TableCell className="space-id-cell" onClick={handleModalOpen}>
          {data.space_id}
        </TableCell>
        <Dialog
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="space-details-dialog-title"
        >
          <DialogTitle id="login-dialog-title">{data.space_id}</DialogTitle>
          <DialogContent>Capacity: {spaceDetailData.capacity}</DialogContent>
          <DialogContent>
            {spaceDetailData.features.map(feature => {
              return <DialogContent>{feature}</DialogContent>;
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <TableCell>
          {data.is_available ? "Available" : "Not Available"}
        </TableCell>
      </TableRow>
    );
  });
};

const initialState = {
  building: config.DEFAULT_BUILDING,
  datetime: currentDateTime(),
  data: {}
};

export const SpaceAvailabilityBoard = () => {
  const [state, dispatch] = useReducer(spaceAvailabilityReducer, initialState);
  const { data, isLoading, isError, doFetch } = useDataApi([]);

  const urlParams = `?datetime=${state.datetime}&building=${state.building}`;
  const url = `${config.API_SPACES}${urlParams}`;

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    doFetch(url);
  }, [url]);

  // const availabilityData = isError ? dummyData : data;
  const availabilityData = dummyData;

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
          {/* Replace dummyData with data from state */}
          <TableBody>
            {formatAvailabilityData(
              availabilityData,
              dummySpaceDetailData,
              modalOpen,
              handleModalOpen,
              handleModalClose
            )}
          </TableBody>
        </Table>
      </SpaceAvailabilityContext.Provider>
    </div>
  );
};

export default SpaceAvailabilityBoard;
