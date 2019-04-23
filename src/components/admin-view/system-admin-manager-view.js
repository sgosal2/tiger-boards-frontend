import React from "react";
import { Grid } from "@material-ui/core";
import AddSystemAdminForm from "./add-system-admin-form";
import SystemAdminList from "./system-admin-list";

let admins = ["Max", "Sahib", "Nate"];

const SystemAdminManagerView = () => {
  return (
    <div className="edit-form-content">
      <Grid container>
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

export default SystemAdminManagerView;
