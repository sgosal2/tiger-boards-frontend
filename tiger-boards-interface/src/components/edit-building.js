import React from "react";
import {
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CardContent,
  CardActions
} from "@material-ui/core";
import { Link } from "react-router-dom";

const EditBuilding = props => {
  // const spaces = ["114", "113"];
  const spaces = [];

  // Need to change this cuz url parameter is eventually gonna be buildingID
  let buildingName = props.match.params.name;
  buildingName = buildingName === "newbuilding" ? "New Building" : buildingName;

  return (
    <form id="edit-building-content" noValidate autoComplete="off">
      <div id="building-manager">
        <CardContent>
          <TextField
            id="edit-building-name"
            label="Building Name"
            margin="normal"
            value={buildingName}
            fullWidth
          />
          <Typography align="left" variant="h6" id="edit-building-header">
            Select a space to edit its details and availability.
          </Typography>
          <List id="building-list">
            {spaces.length > 0 ? (
              spaces.map(space => (
                <Link
                  to={`/admin/editspace/${space}`}
                  className="unstyled-link"
                >
                  <ListItem key={space} dense button>
                    <ListItemText primary={space} />
                  </ListItem>
                </Link>
              ))
            ) : (
              <>There are currently no spaces in this building.</>
            )}
          </List>
        </CardContent>
        <CardActions>
          <Button color="primary" id="add-new-building-btn">
            Add New Space
          </Button>
          <Button color="primary" id="add-new-building-btn">
            Delete this Building
          </Button>
        </CardActions>
      </div>
    </form>
  );
};

export default EditBuilding;
