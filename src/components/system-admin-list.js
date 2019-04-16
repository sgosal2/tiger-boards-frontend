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
  return (
    <div>
      <Typography variant="h6">System Administrators</Typography>
      <List>
        {admins.admins.map(admin => {
          return (
            <ListItem>
              <ListItemText primary={admin} />
              <ListItemSecondaryAction>
                <Button
                  color="primary"
                  onClick={() => handleAdminRemove(admin)}
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
};

export default SystemAdminList;
