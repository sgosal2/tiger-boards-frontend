import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  Button,
  CardContent,
  CardActions
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { AdminViewContext } from "./admin-view";

const EditEvent = props => {
  // Need to change this cuz url parameter is eventually gonna be eventID
  let eventNameFromID = props.match.params.name;
  eventNameFromID =
    eventNameFromID === "newevent" ? "New Event" : eventNameFromID;

  const [eventName, setEventName] = useState(eventNameFromID);

  const {
    state: { currSpaceID }
  } = useContext(AdminViewContext);

  return (
    <form className="edit-form-content" noValidate autoComplete="off">
      <div id="event-manager">
        <CardContent>
          <TextField
            id="edit-event-name"
            label="Event Name"
            margin="normal"
            value={eventName}
            onChange={event => setEventName(event.target.value)}
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Button color="primary">Delete this Event</Button>

          <div className="spacer" />

          <Link
            to={`/admin/editspace/${currSpaceID}`}
            className="unstyled-link"
          >
            <Button className="right-btn" color="primary">
              Save and Return
            </Button>
          </Link>
          <Button color="primary">Save</Button>
        </CardActions>
      </div>
    </form>
  );
};

export default EditEvent;
