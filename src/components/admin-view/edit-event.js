import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Button,
  CardContent,
  CardActions,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
  Typography
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

import { AdminViewContext } from "./admin-view";
import { currentDate } from "../../utilities/current-date-time";
import useDataApi from "../../utilities/use-data-api";
import config from "../../config.json";

const initDays = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
  Sunday: false
};

const convertDaysString = daysString => {
  // Copy initDays
  const res = JSON.parse(JSON.stringify(initDays));

  if (!daysString) {
    return;
  }

  // Set values of res accordingly based on daysString
  for (let day of daysString) {
    switch (day) {
      case "M":
        res["Monday"] = true;
        break;
      case "T":
        res["Tuesday"] = true;
        break;
      case "W":
        res["Wednesday"] = true;
        break;
      case "R":
        res["Thursday"] = true;
        break;
      case "F":
        res["Friday"] = true;
        break;
      case "S":
        res["Saturday"] = true;
        break;
      case "U":
        res["Sunday"] = true;
        break;
      default:
        break;
    }
  }

  return res;
};

const convertDaysObject = daysObject => {
  if (!daysObject) {
    return;
  }
  let res = "";
  res += daysObject.Monday ? "M" : "";
  res += daysObject.Tuesday ? "T" : "";
  res += daysObject.Wednesday ? "W" : "";
  res += daysObject.Thursday ? "R" : "";
  res += daysObject.Friday ? "F" : "";
  res += daysObject.Saturday ? "S" : "";
  res += daysObject.Sunday ? "U" : "";
  return res;
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
    }
  } = useContext(AdminViewContext);

  const [eventName, setEventName] = useState(class_title);
  const [semesterID, setSemesterID] = useState(semester_id);
  const [isRecurring, setIsRecurring] = useState(true);
  const [activeDays, setActiveDays] = useState(convertDaysString(days));
  const [startTime, setStartTime] = useState(start_time);
  const [endTime, setEndTime] = useState(end_time);

  const [courseSubject, setCourseSubject] = useState(subject);
  const [courseNumber, setCourseNumber] = useState(course_num);
  const [courseInstructorFirstName, setCourseInstructorFirstName] = useState(
    instructor_first
  );
  const [courseInstructorLastName, setCourseInstructorLastName] = useState(
    instructor_last
  );
  const [courseCRN, setCourseCRN] = useState(crn);
  const [forceRedirect, setForceRedirect] = useState(false);

  const eventsApi = useDataApi({});

  const dayPicker = () => {
    return (
      <div id="days-picker">
        <FormLabel component="legend">Days of the Week</FormLabel>
        {Object.keys(initDays).map(day => {
          return (
            <FormControlLabel
              key={day}
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

  const deleteHandler = () => {
    eventsApi.doFetch({
      method: "delete",
      url: `${config.API_EVENTS}${crn}${semester_id}`
    });
  };

  let allData = {
    class_title: eventName,
    subject: courseSubject,
    course_num: courseNumber,
    start_time: startTime,
    end_time: endTime,
    days: convertDaysObject(activeDays),
    space_id,
    instructor_first: courseInstructorFirstName,
    instructor_last: courseInstructorLastName,
    semester_id: semesterID,
    crn: courseCRN
  };

  const saveHandler = () => {
    if (courseCRN === "NEW") {
      alert("Please make a new crn.");
      return;
    } else if (crn === "NEW") {
      // New event
      eventsApi.doFetch({
        method: "post",
        url: config.API_EVENTS,
        data: allData
      });
    } else {
      // Edit event
      eventsApi.doFetch({
        method: "patch",
        url: `${config.API_EVENTS}${crn}${semester_id}`,
        data: allData
      });
    }
  };

  useEffect(() => {
    if (eventsApi.data.msg) {
      setForceRedirect(true);
    }
  }, [eventsApi.data]);

  return space_id && crn && !forceRedirect ? (
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
            label="Start Time"
            value={startTime}
            type="time"
            className="edit-event-time"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
            onChange={event => setStartTime(event.target.value)}
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            className="edit-event-time"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
            onChange={event => setEndTime(event.target.value)}
          />

          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={isRecurring}
                  onChange={event => setIsRecurring(event.target.checked)}
                  disabled
                  value="isRecurring"
                />
              }
              label="Recurring Event (Non-recurring events not supported yet)"
            />
          </FormGroup>

          {isRecurring ? dayPicker() : datePicker()}

          <Typography align="left" variant="h6" id="edit-building-header">
            Course Attributes
          </Typography>

          <TextField
            id="edit-course-subject"
            label="Subject"
            margin="normal"
            value={courseSubject}
            onChange={event => setCourseSubject(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-course-number"
            label="Course Number"
            margin="normal"
            value={courseNumber}
            onChange={event => setCourseNumber(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-course-instructor-first"
            label="Instructor First Name"
            margin="normal"
            value={courseInstructorFirstName}
            onChange={event => setCourseInstructorFirstName(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-course-instructor-last"
            label="Instructor Last Name"
            margin="normal"
            value={courseInstructorLastName}
            onChange={event => setCourseInstructorLastName(event.target.value)}
            fullWidth
          />
          <TextField
            id="edit-course-crn"
            label="CRN"
            margin="normal"
            value={courseCRN}
            onChange={event => setCourseCRN(event.target.value)}
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            disabled={eventsApi.isLoading}
            onClick={deleteHandler}
          >
            Delete this Event
          </Button>

          <div className="spacer" />

          <Button
            className="right-btn"
            disabled={eventsApi.isLoading}
            color="primary"
            onClick={saveHandler}
          >
            Save
          </Button>
        </CardActions>
      </div>
    </form>
  ) : space_id && space_id.length > 0 ? (
    <Redirect to={`/admin/editspace/${space_id}`} />
  ) : (
    <Redirect to="/admin/" />
  );
};

export default EditEvent;
