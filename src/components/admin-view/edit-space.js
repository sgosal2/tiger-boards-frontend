import React, { useState, useContext, useEffect } from "react";
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

import useDataApi from "../../utilities/use-data-api";
import config from "../../config.json";

const convertFeatures = featuresList => {
  let res = "{";
  for (let feature of featuresList.slice(0, featuresList.length - 1)) {
    res += `\"${feature}\", `;
  }
  const lastFeature = featuresList[featuresList.length - 1];
  res += `\"${lastFeature}\"}`;
  return res;
};

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
  const [forceRedirect, setForceRedirect] = useState(false);

  const eventsData = useDataApi(`${config.API_EVENTS}?space_id=${space_id}`);
  const spacesApi = useDataApi({});

  const eventSelectHandler = eventData =>
    dispatch({ type: "change-curr-event-data", value: eventData });

  const deleteHandler = () => {
    spacesApi.doFetch({
      method: "delete",
      url: `${config.API_SPACES}${space_id}`
    });
  };

  const saveHandler = () => {
    if (spaceID === "newspace") {
      alert("Please make a new building id.");
      return;
    } else if (space_id === "newspace") {
      // New building
      spacesApi.doFetch({
        method: "post",
        url: config.API_SPACES,
        data: {
          space_id: spaceID,
          building_id,
          name: spaceName,
          capacity: spaceCapacity,
          features: convertFeatures(spaceFeatures.split(", "))
        }
      });
    } else {
      // Edit building
      spacesApi.doFetch({
        method: "patch",
        url: `${config.API_SPACES}${space_id}`,
        data: {
          space_id: spaceID,
          building_id,
          name: spaceName,
          capacity: spaceCapacity,
          features: convertFeatures(spaceFeatures.split(", "))
        }
      });
    }
  };

  const newEventHandler = () =>
    eventSelectHandler({
      class_title: "New Event",
      subject: "",
      course_num: "",
      start_time: "",
      end_time: "",
      days: "MWF",
      space_id: space_id,
      instructor_first: "",
      instructor_last: "",
      semester_id: "",
      crn: "NEW"
    });

  useEffect(() => {
    if (spacesApi.data.msg) {
      setForceRedirect(true);
    }
  }, [spacesApi.data]);

  return building_id && space_id && !forceRedirect ? (
    <form className="edit-form-content" noValidate autoComplete="off">
      <div id="space-manager">
        <CardContent>
          <TextField
            id="edit-space-id"
            label="Space ID"
            margin="normal"
            value={spaceID}
            disabled={space_id !== "newspace"}
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
          <List component="nav" className="ht20" id="events-list">
            {eventsData.data && eventsData.data.length > 0 ? (
              eventsData.data.map(eventData => {
                const event = `${eventData.crn}${eventData.semester_id}`;
                return (
                  <Link
                    to={`/admin/editevent/${event}`}
                    key={event}
                    className="unstyled-link"
                  >
                    <ListItem
                      key={event}
                      onClick={() => eventSelectHandler(eventData)}
                      dense
                      button
                      className="edit-form-list-item"
                    >
                      <ListItemText
                        primary={`${event} -- ${eventData.class_title}`}
                      />
                    </ListItem>
                  </Link>
                );
              })
            ) : eventsData.isLoading ? (
              <>Loading...</>
            ) : (
              <>There are currently no events in this space.</>
            )}
          </List>
        </CardContent>
        <CardActions>
          <Link to={`/admin/editevent/newevent`} className="unstyled-link">
            <Button
              color="primary"
              disabled={spacesApi.isLoading}
              onClick={newEventHandler}
            >
              Add Event
            </Button>
          </Link>
          <Button
            color="primary"
            disabled={
              spacesApi.isLoading ||
              (eventsData.data && eventsData.data.length > 0)
            }
            onClick={deleteHandler}
          >
            Delete this Space
          </Button>

          <div className="spacer" />

          <Button
            className="right-btn"
            color="primary"
            disabled={spacesApi.isLoading}
            onClick={saveHandler}
          >
            Save
          </Button>
        </CardActions>
      </div>
    </form>
  ) : building_id && building_id.length > 0 ? (
    <Redirect to={`/admin/editbuilding/${building_id}`} />
  ) : (
    <Redirect to="/admin/" />
  );
};

export default EditSpace;
