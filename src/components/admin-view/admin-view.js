import React, { useState, useReducer, useContext } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Route, Redirect, Switch } from "react-router-dom";
import { UserContext } from "../../App";
import adminViewReducer from "../../reducers/admin-view-reducer";

const initialState = {
  buildingsData: [],
  spacesData: [],
  currEventID: "",
  eventsData: [],
  currBuildingData: {},
  currSpaceData: {},
  currEventData: {}
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
  const user = useContext(UserContext);

  console.log(user.isAdmin);
  return user.isAdmin ? (
    <AdminViewContext.Provider value={{ state, dispatch }}>
      <div id="admin-view-content">
        <Tabs
          value={currTab}
          onChange={(event, value) => setCurrTab(value)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            label="Manage Spaces"
            onClick={() => dispatch({ type: "reset-data" })}
          />
          <Tab label="Manage Admins" />
        </Tabs>

        {currTab === 0 && <BuildingManagerTab />}
        {currTab === 1 && <SystemAdminManager />}
      </div>
    </AdminViewContext.Provider>
  ) : (
    <Redirect to="/" />
  );
};

export default AdminView;
