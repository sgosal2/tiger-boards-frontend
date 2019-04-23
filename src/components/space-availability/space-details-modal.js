import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

const SpaceDetailsModal = ({
  detailsData,
  modalOpen,
  handleModalClose,
  loading
}) => {
  if (loading || detailsData == null) {
    return (
      <Dialog open={modalOpen}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="space-details-dialog-title"
      >
        <DialogTitle id="login-dialog-title">{detailsData.name}</DialogTitle>
        <DialogContent>Capacity: {detailsData.capacity}</DialogContent>
        <DialogTitle>Features: </DialogTitle>
        {detailsData.features.map(feature => {
          return <DialogContent>{feature}</DialogContent>;
        })}
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default SpaceDetailsModal;
