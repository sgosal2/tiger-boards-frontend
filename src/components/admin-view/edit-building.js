import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CardContent,
  Toolbar
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

import { AdminViewContext } from "./admin-view";
import useDataApi from "../../utilities/use-data-api";
import config from "../../config.json";

const EditBuilding = () => {
  const {
    state: {
      currBuildingData: { building_id, building_name }
    },
    dispatch
  } = useContext(AdminViewContext);
  const buildingData = useDataApi(
    `${config.API_SPACES}?building_id=${building_id}`
  );
  const saveBuilding = useDataApi({});

  const [buildingID, setBuildingID] = useState(building_id);
  const [buildingName, setBuildingName] = useState(building_name);

  const spaceSelectHandler = spaceData =>
    dispatch({ type: "change-curr-space-data", value: spaceData });

  const saveHandler = () => {
    if (buildingID === "NEW") {
      alert("Please make a new building id.");
    } else if (building_id === "NEW") {
      // New building
      saveBuilding.doFetch({
        method: "post",
        url: config.API_BUILDINGS,
        data: {
          building_id: buildingID,
          building_name: buildingName
        }
      });
    } else {
      // Edit building
      saveBuilding.doFetch({
        method: "patch",
        url: `${config.API_BUILDINGS}${building_id}`,
        data: {
          new_id: buildingID,
          new_name: buildingName
        }
      });
    }
  };

  const deleteHandler = () => {
    saveBuilding.doFetch({
      method: "delete",
      url: `${config.API_BUILDINGS}${building_id}`
    });
  };

  useEffect(() => {
    if (saveBuilding.data.msg) {
      dispatch({ type: "reset-data" });
    }
  }, [saveBuilding.data]);

  return building_id ? (
    <form className="edit-form-content" noValidate autoComplete="off">
      <div id="building-manager">
        <CardContent>
          <TextField
            id="edit-building-id"
            label="Building ID"
            margin="normal"
            value={buildingID}
            disabled={building_id !== "NEW"}
            onChange={event => setBuildingID(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-building-name"
            label="Building Name"
            margin="normal"
            value={buildingName}
            onChange={event => setBuildingName(event.target.value)}
            fullWidth
          />
          <Typography align="left" variant="h6" id="edit-building-header">
            Spaces
          </Typography>
          <List id="building-list">
            {buildingData.data && buildingData.data.length > 0 ? (
              buildingData.data.map(spaceData => (
                <Link
                  key={spaceData.space_id}
                  to={
                    saveBuilding.isLoading
                      ? "#"
                      : `/admin/editspace/${spaceData.space_id}`
                  }
                  className="unstyled-link"
                  disabled={saveBuilding.isLoading}
                >
                  <ListItem
                    onClick={() => spaceSelectHandler(spaceData)}
                    key={spaceData.space_id}
                    dense
                    button
                    className="edit-form-list-item"
                  >
                    <ListItemText primary={spaceData.name} />
                  </ListItem>
                </Link>
              ))
            ) : buildingData.isLoading ? (
              <>Loading...</>
            ) : (
              <>There are currently no spaces in this building.</>
            )}
          </List>
        </CardContent>
        <Toolbar>
          <Link
            to={
              saveBuilding.isLoading || building_id === "NEW"
                ? "#"
                : `/admin/editspace/newspace`
            }
            className="unstyled-link"
          >
            <Button
              disabled={saveBuilding.isLoading || building_id === "NEW"}
              color="primary"
              onClick={() =>
                spaceSelectHandler({
                  space_id: "newspace",
                  name: "New Space",
                  capacity: 0,
                  features: ""
                })
              }
            >
              Add New Space
            </Button>
          </Link>
          <Button
            disabled={saveBuilding.isLoading}
            onClick={deleteHandler}
            color="primary"
          >
            Delete this Building
          </Button>

          <div className="spacer" />

          <Button
            onClick={saveHandler}
            disabled={saveBuilding.isLoading}
            color="primary"
          >
            Save
          </Button>
        </Toolbar>
      </div>
    </form>
  ) : (
    <Redirect to="/admin/" />
  );
};

export default EditBuilding;
