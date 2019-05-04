import React, { useEffect } from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";
import config from "../../config.json";
import useDataApi from "../../utilities/use-data-api";

export const SystemAdminList = () => {
  const systemAdmins = useDataApi({});
  const updateSystemAdmins = useDataApi({});

  const systemAdminsUrl = `${config.API_ADMINS}`;
  useEffect(() => systemAdmins.doFetch(systemAdminsUrl), [systemAdminsUrl]);

  const handleAdminRemove = email => {
    updateSystemAdmins.doFetch({
      method: "delete",
      url: `${config.API_ADMINS}${email}`
    });
    console.log("Admin removed");
  };

  if (systemAdmins.isLoading || systemAdmins.data.length == 0) {
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
          {systemAdmins.data.map(admin => {
            return (
              <ListItem>
                <ListItemText primary={admin.email} />
                <ListItemSecondaryAction>
                  <Button
                    color="primary"
                    onClick={() => handleAdminRemove(admin.email)}
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
