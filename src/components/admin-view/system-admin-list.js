import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";

export const SystemAdminList = ({ admins, handleRemove, isLoading }) => {
  if (isLoading || admins.length == 0) {
    return (
      <div>
        <Typography variant="h6">System Administrators</Typography>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        <Typography variant="h6">System Administrators</Typography>
        <List>
          {admins.map(admin => {
            return (
              <ListItem>
                <ListItemText primary={admin.email} />
                <ListItemSecondaryAction>
                  <Button
                    color="primary"
                    onClick={() => handleRemove(admin.email)}
                  >
                    Remove
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
};

export default SystemAdminList;
