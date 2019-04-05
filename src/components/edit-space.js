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

const EditSpace = props => {
  // Need to change this cuz url parameter is eventually gonna be spaceID
  let spaceName = props.match.params.name;
  spaceName = spaceName === "newspace" ? "New Space" : spaceName;

  return (
    <form id="edit-space-content" noValidate autoComplete="off">
      <div id="space-manager">
        <CardContent>
          <TextField
            id="edit-space-name"
            label="Space Name"
            margin="normal"
            value={spaceName}
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Link to={`/admin/editevent/newevent`} className="unstyled-link">
            <Button color="primary">Add Event</Button>
          </Link>
          <Button color="primary">Delete this Space</Button>
        </CardActions>
      </div>
    </form>
  );
};

export default EditSpace;
