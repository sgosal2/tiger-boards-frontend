import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableRow,
  TableCell
} from "@material-ui/core";

const SpaceAvailabilityBody = ({ availabilityData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return availabilityData.map(data => {
    return (
      <TableRow hover key={data.space_id}>
        <TableCell className="space-id-cell" onClick={() => handleModalOpen()}>
          {data.name}
        </TableCell>
        <Dialog
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="space-details-dialog-title"
        >
          <DialogTitle id="login-dialog-title">{data.space_id}</DialogTitle>
          <DialogContent>Capacity: Example</DialogContent>
          <DialogContent>
            <DialogContent>Example feature 1</DialogContent>
            <DialogContent>Example feature 2</DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <TableCell>
          {/* TODO: waiting for availability data from api */}
          Available
        </TableCell>
      </TableRow>
    );
  });
};

export default SpaceAvailabilityBody;
