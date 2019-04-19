import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  CardContent,
  CardActions,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { AdminViewContext } from "./admin-view";
import { currentDate } from "../../utilities/current-date-time";

const initDays = {
  Monday: true,
  Tuesday: false,
  Wednesday: true,
  Thursday: false,
  Friday: true,
  Saturday: false,
  Sunday: false
};

const EditEvent = props => {
  // Need to change this cuz url parameter is eventually gonna be eventID
  let eventNameFromID = props.match.params.name;
  eventNameFromID =
    eventNameFromID === "newevent" ? "New Event" : eventNameFromID;

  const [eventID, setEventID] = useState("123456");
  const [eventName, setEventName] = useState(eventNameFromID);
  const [semesterID, setSemesterID] = useState("fall_2019");
  const [isRecurring, setIsRecurring] = useState(true);
  const [days, setDays] = useState(initDays);

  const {
    state: { currSpaceID }
  } = useContext(AdminViewContext);

  const dayPicker = () => {
    return (
      <div id="days-picker">
        <FormLabel component="legend">Days of the Week</FormLabel>
        {Object.keys(initDays).map(day => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={days[day]}
                  onChange={event =>
                    setDays({ ...days, [day]: event.target.checked })
                  }
                  value={day}
                />
              }
              label={day}
            />
          );
        })}
      </div>
    );
  };

  const datePicker = () => {
    return (
      <div id="date-picker">
        <TextField
          id="event-date"
          label="Event Date"
          type="date"
          defaultValue={currentDate()}
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
    );
  };

  return (
    <form className="edit-form-content" noValidate autoComplete="off">
      <div id="event-manager">
        <CardContent className="edit-form-container">
          <TextField
            id="edit-event-id"
            label="Event ID"
            margin="normal"
            value={eventID}
            onChange={event => setEventID(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-event-name"
            label="Event Name"
            margin="normal"
            value={eventName}
            onChange={event => setEventName(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-event-semester"
            label="Semester ID"
            margin="normal"
            value={semesterID}
            onChange={event => setSemesterID(event.target.value)}
            fullWidth
          />
          <TextField
            id="time"
            label="Start Time"
            type="time"
            defaultValue="08:00"
            className="edit-event-time"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
          />
          <TextField
            id="time"
            label="End Time"
            type="time"
            defaultValue="09:00"
            className="edit-event-time"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
          />

          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={isRecurring}
                  onChange={event => setIsRecurring(event.target.checked)}
                  value="isRecurring"
                />
              }
              label="Recurring Event"
            />
          </FormGroup>

          {isRecurring ? dayPicker() : datePicker()}
        </CardContent>
        <CardActions>
          <Button color="primary">Delete this Event</Button>

          <div className="spacer" />

          <Link
            to={
              currSpaceID.length > 0
                ? `/admin/editspace/${currSpaceID}`
                : "/admin/"
            }
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
