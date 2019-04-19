import React, { useState, useContext } from "react";
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
import { Link, Redirect } from "react-router-dom";
import { AdminViewContext } from "./admin-view";

const EditSpace = () => {
  const {
    state: {
      currBuildingData: { building_id },
      currSpaceData: { space_id, name, capacity, features }
    },
    dispatch
  } = useContext(AdminViewContext);
  const [spaceID, setSpaceID] = useState(space_id);
  const [spaceName, setSpaceName] = useState(name);
  const [spaceFeatures, setSpaceFeatures] = useState(
    features ? features.join(", ") : ""
  );
  const [spaceCapacity, setSpaceCapacity] = useState(capacity);

  const events = ["COMP 51", "COMP 53"];

  const eventSelectHandler = eventID =>
    dispatch({ type: "change-curreventid", value: eventID });

  return building_id && space_id ? (
    <form className="edit-form-content" noValidate autoComplete="off">
      <div id="space-manager">
        <CardContent>
          <TextField
            id="edit-space-id"
            label="Space ID"
            margin="normal"
            value={spaceID}
            onChange={event => setSpaceID(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-space-name"
            label="Space Name"
            margin="normal"
            value={spaceName}
            onChange={event => setSpaceName(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-space-capacity"
            label="Capacity"
            value={spaceCapacity}
            type="number"
            margin="normal"
            onChange={event => setSpaceCapacity(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-space-features"
            label="Features (Please separate each feature using commas)"
            margin="normal"
            value={spaceFeatures}
            onChange={event => setSpaceFeatures(event.target.value)}
            fullWidth
          />
          <Typography align="left" variant="h6" id="edit-building-header">
            Events
          </Typography>
          <List component="nav" id="events-list">
            {events.length > 0 ? (
              events.map(event => (
                <Link
                  to={`/admin/editevent/${event}`}
                  key={event}
                  className="unstyled-link"
                >
                  <ListItem
                    key={event}
                    onClick={() => eventSelectHandler(event)}
                    dense
                    button
                    className="edit-form-list-item"
                  >
                    <ListItemText primary={event} />
                  </ListItem>
                </Link>
              ))
            ) : (
              <>There are currently no events in this space.</>
            )}
          </List>
        </CardContent>
        <CardActions>
          <Link to={`/admin/editevent/newevent`} className="unstyled-link">
            <Button color="primary">Add Event</Button>
          </Link>
          <Button color="primary">Delete this Space</Button>

          <div className="spacer" />

          <Link
            to={
              building_id && building_id.length > 0
                ? `/admin/editbuilding/${building_id}`
                : "/admin/"
            }
            className="unstyled-link"
          >
            <Button className="right-btn" color="primary">
              Save and return
            </Button>
          </Link>
          <Button color="primary">Save</Button>
        </CardActions>
      </div>
    </form>
  ) : (
    <Redirect to="/admin/" />
  );
};

export default EditSpace;
