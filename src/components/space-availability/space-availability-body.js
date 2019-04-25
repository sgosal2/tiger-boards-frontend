import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";

const SpaceAvailabilityBody = ({ availabilityData, handleModalOpen }) => {
  return availabilityData.map(data => {
    return (
      <TableRow
        hover
        key={data.space_id}
        onClick={() => handleModalOpen(data.space_id)}
      >
        <TableCell className="space-id-cell">{data.name}</TableCell>
        <TableCell className="space-id-cell">{data.is_available}</TableCell>
      </TableRow>
    );
  });
};

export default SpaceAvailabilityBody;
