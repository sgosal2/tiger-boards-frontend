import React, { useState, useReducer } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import adminViewReducer from "../../reducers/admin-view-reducer";

const initialState = {
  currBuildingID: "",
  buildingsData: [],
  currSpaceID: "",
  spacesData: [],
  currEventID: "",
  eventsData: []
};

const buildingManager = React.lazy(() => import("./building-manager"));
const editBuilding = React.lazy(() => import("./edit-building"));
const editEvent = React.lazy(() => import("./edit-event"));
const editSpace = React.lazy(() => import("./edit-space"));
const SystemAdminManager = React.lazy(() =>
  import("./system-admin-manager-view")
);

export const AdminViewContext = React.createContext();

const BuildingManagerTab = () => {
  return (
    <Switch>
      <Route exact path="/admin/" component={buildingManager} />
      <Route path="/admin/editbuilding/:name" component={editBuilding} />
      <Route path="/admin/editspace/:name" component={editSpace} />
      <Route path="/admin/editevent/:name" component={editEvent} />
    </Switch>
  );
};

const AdminView = () => {
  const [currTab, setCurrTab] = useState(0);
  const [state, dispatch] = useReducer(adminViewReducer, initialState);

  return (
    <AdminViewContext.Provider value={{ state, dispatch }}>
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

        {currTab === 0 && <BuildingManagerTab />}
        {currTab === 1 && <SystemAdminManager />}
      </div>
    </AdminViewContext.Provider>
  );
};

export default AdminView;
