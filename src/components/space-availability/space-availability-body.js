import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const SpaceAvailabilityBody = ({ availabilityData }) => {
  return availabilityData.map(data => {
    return (
      <TableRow hover key={data.space_id}>
        <TableCell
          className="space-id-cell"
          onClick={() => alert(data.space_id)}
        >
          {data.name}
        </TableCell>
        <TableCell>
          {/* TODO: waiting for availability data from api */}
          Available
        </TableCell>
      </TableRow>
    );
  });
};

export default SpaceAvailabilityBody;
