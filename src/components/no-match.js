import React from "react";
import { Typography } from "@material-ui/core";

export const NoMatch = () => {
  return (
    <div id="no-match-content">
      <Typography align="center" variant="h1">
        404
      </Typography>
      <Typography align="center" variant="h5">
        The page you are looking for can not be found.
      </Typography>
    </div>
  );
};

export default NoMatch;
