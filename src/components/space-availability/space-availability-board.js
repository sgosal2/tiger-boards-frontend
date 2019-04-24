import React, { useState, useReducer, useEffect } from "react";
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
import SpaceDetailsModal from "./space-details-modal";

export const SpaceAvailabilityContext = React.createContext();

const initialState = {
  building: config.DEFAULT_BUILDING,
  datetime: currentDateTime(),
  data: []
};

export const SpaceAvailabilityBoard = () => {
  const [state, dispatch] = useReducer(spaceAvailabilityReducer, initialState);
  const spacesApiResponse = useDataApi({});
  const spaceDetailsApiResponse = useDataApi({});

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = space_id => {
    const url = `${config.API_SPACES}${space_id}`;
    spaceDetailsApiResponse.doFetch(url);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const urlParams = `?building_id=${state.building}&datetime=${state.datetime}`;
  const url = `${config.API_SPACES}${urlParams}`;

  useEffect(() => {
    spacesApiResponse.doFetch(url);
  }, [url]);

  useEffect(() => {
    if (!spacesApiResponse.isError || !spacesApiResponse.isLoading) {
      dispatch({ type: "change-data", value: spacesApiResponse.data });
    }
  }, [spacesApiResponse.data]);

  return (
    <div id="space-availability-board">
      <SpaceDetailsModal
        detailsData={spaceDetailsApiResponse.data[0]}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        loading={spaceDetailsApiResponse.isLoading}
      />
      <SpaceAvailabilityContext.Provider value={{ state, dispatch }}>
        <SpaceAvailabilityParameters disabled={spacesApiResponse.isLoading} />
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
