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

const EditBuilding = props => {
  const spaces = ["114", "113"];
  // const spaces = [];
  const { dispatch } = useContext(AdminViewContext);

  const [buildingID, setBuildingID] = useState("12345");
  // Need to change this cuz url parameter is eventually gonna be buildingID
  let buildingNameFromID = props.match.params.name;
  buildingNameFromID =
    buildingNameFromID === "newbuilding" ? "New Building" : buildingNameFromID;
  const [buildingName, setBuildingName] = useState(buildingNameFromID);

  const spaceSelectHandler = spaceID =>
    dispatch({ type: "change-currspaceid", value: spaceID });

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
            {spaces.length > 0 ? (
              spaces.map(space => (
                <Link
                  key={space}
                  to={`/admin/editspace/${space}`}
                  className="unstyled-link"
                >
                  <ListItem
                    onClick={() => spaceSelectHandler(space)}
                    key={space}
                    dense
                    button
                    className="edit-form-list-item"
                  >
                    <ListItemText primary={space} />
                  </ListItem>
                </Link>
              ))
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
            <Button size="small" noWrap color="primary">
              Save and Return
            </Button>
          </Link>
          <Button noWrap color="primary">
            Save
          </Button>
        </Toolbar>
      </div>
    </form>
  );
};

export default EditBuilding;
