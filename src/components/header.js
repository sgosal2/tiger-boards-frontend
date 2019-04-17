import React from "react";
import { Typography } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

const HeaderText = ({ text }) => (
  <Typography align="left" variant="h2" id="view-header-text">
    {text}
  </Typography>
);

const Header = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => <HeaderText text="Space Availability" />}
      />
      <Route
        exact
        path="/admin/"
        component={() => <HeaderText text="Admin" />}
      />
      <Route
        exact
        path="/account/"
        component={() => <HeaderText text="Account" />}
      />
    </Switch>
  );
};

export default Header;
