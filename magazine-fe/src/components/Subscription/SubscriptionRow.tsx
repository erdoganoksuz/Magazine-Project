import React, { useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import magazineService from "../Api";

interface Subscription {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isCancelled: boolean;
  cancellationDate: string;
  onChange: () => void;
}
const SubscriptionRow: React.FC<Subscription> = ({
  id,
  name,
  startDate,
  endDate,
  isCancelled,
  cancellationDate,
  onChange,
}) => {
  const handleUnsubscribe = async () => {
    await magazineService.delete(`/subscription/${id}`);
    onChange();
  };

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{startDate}</TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>{isCancelled ? "Yes" : "No"}</TableCell>
      <TableCell>{cancellationDate}</TableCell>
      <TableCell>
        {!isCancelled && (
          <Button variant="outlined" color="error" onClick={handleUnsubscribe}>
            Unsubscribe
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SubscriptionRow;
