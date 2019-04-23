import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";

const SpaceAvailabilityBody = ({ availabilityData, handleModalOpen }) => {
  return availabilityData.map(data => {
    return (
      <TableRow hover key={data.space_id}>
        <TableCell
          className="space-id-cell"
          onClick={() => handleModalOpen(data.space_id)}
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
