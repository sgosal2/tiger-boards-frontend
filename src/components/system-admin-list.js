import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";

export const SystemAdminList = admins => {
  let listItems = [];
  for (let admin in admins.admins) {
    listItems.push(
      <ListItem>
        <ListItemText primary={admins.admins[admin]} />
        <ListItemSecondaryAction>
          <Button variant="contained" color="primary">
            Remove
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  return (
    <div>
      <Typography align="center" variant="h5" id="system-admin-list-header">
        System Administrators
      </Typography>
      <List>{listItems}</List>
    </div>
  );
};

export default SystemAdminList;
