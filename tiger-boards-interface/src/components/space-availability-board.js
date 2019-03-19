import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { SpaceAvailabilityParameters } from "./space-availability-parameters";

// Don't use this.
const dummyData = [
  {
    space_id: "CTC 113",
    is_available: true
  },
  {
    space_id: "CTC 114",
    is_available: false
  },
  {
    space_id: "CTC 115",
    is_available: true
  }
];

const formatAvailabilityData = availabilityData =>
  availabilityData.map(data => {
    return (
      <TableRow hover key={data.space_id}>
        <TableCell
          className="space-id-cell"
          onClick={() => alert(data.space_id)}
        >
          {data.space_id}
        </TableCell>
        <TableCell>
          {data.is_available ? "Available" : "Not Available"}
        </TableCell>
      </TableRow>
    );
  });

export const SpaceAvailabilityBoard = () => {
  return (
    <div id="space-availability-board">
      <SpaceAvailabilityParameters />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Space</TableCell>
            <TableCell>Availability</TableCell>
          </TableRow>
        </TableHead>
        {/* Replace dummyData with data from state */}
        <TableBody>{formatAvailabilityData(dummyData)}</TableBody>
      </Table>
    </div>
  );
};

export default SpaceAvailabilityBoard;
