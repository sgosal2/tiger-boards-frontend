import React, { useState, useReducer } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import adminViewReducer from "../../reducers/admin-view-reducer";

const initialState = {
  currBuildingID: "",
  currSpaceID: "",
  currEventID: ""
};

const buildingManager = React.lazy(() => import("./building-manager"));
const editBuilding = React.lazy(() => import("./edit-building"));
const editSpace = React.lazy(() => import("./edit-space"));

export const AdminViewContext = React.createContext();

const AdminView = () => {
  const [currTab, setCurrTab] = useState(0);
  const [state, dispatch] = useReducer(adminViewReducer, initialState);

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

      <AdminViewContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path="/admin/" component={buildingManager} />
          <Route path="/admin/editbuilding/:name" component={editBuilding} />
          <Route path="/admin/editspace/:name" component={editSpace} />
        </Switch>
      </AdminViewContext.Provider>
    </div>
  );
};

export default AdminView;
