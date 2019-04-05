import React from "react";
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

// Don't use this.
const dummyBuildings = ["Chambers", "Anderson", "Khoury"];

const BuildingManager = () => {
  const buildings = dummyBuildings;
  // const buildings = [];

  return (
    <div id="building-manager">
      <CardContent>
        <Typography align="left" variant="h6">
          Select a building to edit its details and spaces.
        </Typography>
        <List id="building-list">
          {buildings.length > 0 ? (
            buildings.map(building => (
              <Link
                to={`/admin/editbuilding/${building}`}
                className="unstyled-link"
              >
                <ListItem key={building} dense button>
                  <ListItemText primary={building} />
                </ListItem>
              </Link>
            ))
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
