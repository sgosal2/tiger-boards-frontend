import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import AddSystemAdminForm from "./add-system-admin-form";
import SystemAdminList from "./system-admin-list";

import config from "../../config.json";
import useDataApi from "../../utilities/use-data-api";

export const SystemAdminsContext = React.createContext();

const SystemAdminManagerView = () => {
  const [admins, setAdmins] = useState([]);
  const [forceRefetch, setForceRefetch] = useState(false);

  const systemAdmins = useDataApi(config.API_ADMINS);
  const systemAdminsActions = useDataApi({});

  const handleRemove = email =>
    systemAdminsActions.doFetch({
      method: "delete",
      url: `${config.API_ADMINS}${email}`
    });

  useEffect(() => {
    if (systemAdminsActions.data && systemAdminsActions.data.msg) {
      systemAdmins.doFetch(config.API_ADMINS);
    }
  }, [systemAdminsActions.data]);

  useEffect(() => {
    if (!systemAdmins.isLoading && systemAdmins.data) {
      setAdmins(systemAdmins.data);
    }
  }, [systemAdmins.isLoading]);

  return (
    <SystemAdminsContext.Provider
      value={{
        adminsList: admins,
        changeAdmins: admins => setAdmins(admins),
        shouldRefetch: forceRefetch,
        changeForceRefetch: refetch => setForceRefetch(refetch)
      }}
    >
      <div className="edit-form-content">
        <Grid container>
          <Grid item xs={6}>
            <SystemAdminList admins={admins} handleRemove={handleRemove} />
          </Grid>
          <Grid item xs={6}>
            <AddSystemAdminForm />
          </Grid>
        </Grid>
      </div>
    </SystemAdminsContext.Provider>
  );
};

export default SystemAdminManagerView;
