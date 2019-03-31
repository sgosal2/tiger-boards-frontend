import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

export const AdminView = () => {
  const [currTab, setCurrTab] = useState(0);

  return (
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
  );
};

export default AdminView;
