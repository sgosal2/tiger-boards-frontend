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

const EditEvent = () => {
  const {
    state: {
      currEventData: {
        class_title,
        subject,
        course_num,
        start_time,
        end_time,
        days,
        space_id,
        instructor_first,
        instructor_last,
        semester_id,
        crn
      }
    },
    dispatch
  } = useContext(AdminViewContext);

  const [eventID, setEventID] = useState(`${crn}${semester_id}`);
  const [eventName, setEventName] = useState(class_title);
  const [semesterID, setSemesterID] = useState(semester_id);
  const [isRecurring, setIsRecurring] = useState(true);
  const [activeDays, setActiveDays] = useState(initDays);

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
                  checked={activeDays[day]}
                  onChange={event =>
                    setActiveDays({
                      ...activeDays,
                      [day]: event.target.checked
                    })
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
              space_id.length > 0 ? `/admin/editspace/${space_id}` : "/admin/"
            }
            className="unstyled-link"
          >
            <Button className="right-btn" color="primary">
              Save
            </Button>
          </Link>
        </CardActions>
      </div>
    </form>
  );
};

export default EditEvent;
