import React, { useState, useContext } from "react";
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
import { Link } from "react-router-dom";

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
  const { data, isLoading } = useDataApi(
    `${config.API_SPACES}?building_id=${building_id}`
  );

  const [buildingID, setBuildingID] = useState(building_id);
  const [buildingName, setBuildingName] = useState(building_name);

  const spaceSelectHandler = spaceData =>
    dispatch({ type: "change-curr-space-data", value: spaceData });

  return (
    <form className="edit-form-content" noValidate autoComplete="off">
      <div id="building-manager">
        <CardContent>
          <TextField
            id="edit-building-id"
            label="Building ID"
            margin="normal"
            value={buildingID}
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
            {data && data.length > 0 ? (
              data.map(spaceData => (
                <Link
                  key={spaceData.space_id}
                  to={`/admin/editspace/${spaceData.space_id}`}
                  className="unstyled-link"
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
            ) : isLoading ? (
              <>Loading...</>
            ) : (
              <>There are currently no spaces in this building.</>
            )}
          </List>
        </CardContent>
        <Toolbar>
          <Link to={`/admin/editspace/newspace`} className="unstyled-link">
            <Button color="primary">Add New Space</Button>
          </Link>
          <Button color="primary">Delete this Building</Button>

          <div className="spacer" />

          <Link to={`/admin/`} className="unstyled-link">
            <Button size="small" color="primary">
              Save and Return
            </Button>
          </Link>
          <Button color="primary">Save</Button>
        </Toolbar>
      </div>
    </form>
  );
};

export default EditBuilding;
