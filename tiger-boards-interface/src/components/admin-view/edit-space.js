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
import { Link } from "react-router-dom";
import { AdminViewContext } from "./admin-view";

const EditSpace = props => {
  // Need to change this cuz url parameter is eventually gonna be spaceID
  let spaceNameFromID = props.match.params.name;
  spaceNameFromID =
    spaceNameFromID === "newspace" ? "New Space" : spaceNameFromID;

  const [spaceName, setSpaceName] = useState(spaceNameFromID);
  const [spaceFeatures, setSpaceFeatures] = useState("Projector, Whiteboard");
  const [spaceCapacity, setSpaceCapacity] = useState(25);

  const events = ["COMP 51", "COMP 53"];
  const {
    state: { currBuildingID },
    dispatch
  } = useContext(AdminViewContext);

  const eventSelectHandler = eventID =>
    dispatch({ type: "change-curreventid", value: eventID });

  return (
    <form className="edit-form-content" noValidate autoComplete="off">
      <div id="space-manager">
        <CardContent>
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
            to={`/admin/editbuilding/${currBuildingID}`}
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
  );
};

export default EditSpace;
