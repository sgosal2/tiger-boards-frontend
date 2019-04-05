import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import BuildingManager from "./building-manager";

const AdminView = () => {
  const [currTab, setCurrTab] = useState(0);

  return (
    <div id="admin-view-content">
      <Tabs
        value={currTab}
        onChange={(event, value) => setCurrTab(value)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Manage Spaces" />
        <Tab label="Manage Admins" />
      </Tabs>
      <BuildingManager />
    </div>
  );
};

export default AdminView;
