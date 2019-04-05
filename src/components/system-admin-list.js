import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";

let handleAdminRemove = admin => {
  alert(`${admin} will be removed from the admin list`);
};

export const SystemAdminList = admins => {
  let listItems = [];
  for (let admin in admins.admins) {
    listItems.push(
      <ListItem>
        <ListItemText primary={admins.admins[admin]} />
        <ListItemSecondaryAction>
          <Button
            color="primary"
            onClick={() => handleAdminRemove(admins.admins[admin])}
          >
            Remove
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  return (
    <div>
      <Typography variant="h6">System Administrators</Typography>
      <List>{listItems}</List>
    </div>
  );
};

export default SystemAdminList;
