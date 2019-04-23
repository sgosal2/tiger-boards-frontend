import React, { useContext, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CardContent,
  CardActions
} from "@material-ui/core";
import { Link } from "react-router-dom";

import config from "../../config.json";
import { AdminViewContext } from "./admin-view";
import useDataApi from "../../utilities/use-data-api";

const BuildingManager = () => {
  const { data, isLoading, isError } = useDataApi(config.API_BUILDINGS);
  const {
    state: { buildingsData },
    dispatch
  } = useContext(AdminViewContext);

  const buildingSelectHandler = buildingID =>
    dispatch({ type: "change-currbuildingid", value: buildingID });

  useEffect(() => {
    if (!isError || !isLoading) {
      dispatch({ type: "change-buildings-data", value: data });
    }
  }, [data]);

  return (
    <div id="building-manager">
      <CardContent>
        <Typography align="left" variant="h6">
          Select a building to edit its details and spaces.
        </Typography>
        <List id="building-list">
          {buildingsData.length > 0 ? (
            buildingsData.map(({ building_id, building_name }) => (
              <Link
                key={building_id}
                to={`/admin/editbuilding/${building_id}`}
                className="unstyled-link"
              >
                <ListItem
                  key={building_id}
                  onClick={() => buildingSelectHandler(building_id)}
                  dense
                  button
                >
                  <ListItemText primary={building_name} />
                </ListItem>
              </Link>
            ))
          ) : isLoading ? (
            <>Loading...</>
          ) : (
            <>There are currently no buildings.</>
          )}
        </List>
      </CardContent>
      <CardActions>
        <Link to={`/admin/editbuilding/newbuilding`} className="unstyled-link">
          <Button color="primary" id="add-new-building-btn">
            Add New Building
          </Button>
        </Link>
      </CardActions>
    </div>
  );
};

export default BuildingManager;
