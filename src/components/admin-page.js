import React from "react";
import { Grid } from "@material-ui/core";
import AddSystemAdminForm from "./add-system-admin-form";
import SystemAdminList from "./system-admin-list";

export const AdminPage = () => {
  let admins = ["Max", "Sahib", "Nate"];
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <SystemAdminList admins={admins} />
        </Grid>
        <Grid item xs={6}>
          <AddSystemAdminForm />
        </Grid>
      </Grid>
    </div>
  );
};
