import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { SpaceAvailabilityParameters } from "./space-availability-parameters";

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

const formatAvailabilityData = (
  availabilityData,
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
          <DialogContent>
            <div>Example dialog</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Close dialog</Button>
          </DialogActions>
        </Dialog>
        <TableCell>
          {data.is_available ? "Available" : "Not Available"}
        </TableCell>
      </TableRow>
    );
  });
};

export const SpaceAvailabilityBoard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  return (
    <div id="space-availability-board">
      <SpaceAvailabilityParameters />

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
            dummyData,
            modalOpen,
            handleModalOpen,
            handleModalClose
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SpaceAvailabilityBoard;
