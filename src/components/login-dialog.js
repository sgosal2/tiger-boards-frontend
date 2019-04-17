import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";

export const LoginDialog = ({ isOpen, handleClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="login-dialog-title"
    >
      <DialogTitle id="login-dialog-title">Login to TigerBoards</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Create Account
        </Button>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        {/* TODO: change to a proper function that attempts to log user in */}
        <Button onClick={() => handleClose()} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
