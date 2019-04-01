import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardActions
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

// Don't use this.
const dummyBuildings = ["Chambers", "Anderson", "Khoury"];

const BuildingManager = () => {
  const buildings = dummyBuildings;

  return (
    <div id="building-manager">
      <CardContent>
        <Typography align="left" variant="h6">
          Select a building to edit its details and spaces.
        </Typography>
        <List id="building-list">
          {buildings.map(building => (
            <ListItem key={building} dense button>
              <ListItemText primary={building} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button color="primary" id="add-new-building-btn">
          Add New Building
        </Button>
      </CardActions>
    </div>
  );
};

const AdminView = () => {
  const [currTab, setCurrTab] = useState(0);

  return (
    <div id="admin-view-content">
      <Tabs
        value={currTab}
        onChange={(event, value) => setCurrTab(value)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Manage Spaces" />
        <Tab label="Manage Admins" />
      </Tabs>
      <BuildingManager />
    </div>
  );
};

export default AdminView;
