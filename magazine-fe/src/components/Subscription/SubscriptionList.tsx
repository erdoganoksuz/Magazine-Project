import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useAsyncRetry } from "react-use";
import magazineService from "../Api";
import SubscriptionRow from "./SubscriptionRow";

interface Subscription {
  magazine: { name: string; monthlyPrice: string };
  isCancelled: boolean;
  id: number;
  cancellationDate: string;
  startDate: string;
  endDate: string;
}

const SubscriptionList = () => {
  const state = useAsyncRetry<Subscription[]>(async () => {
    const subscriptionResponse = await magazineService.get("/subscription");
    return subscriptionResponse.data;
  }, []);

  if (state.loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <h3>Subscription Count : {state.value?.length}</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Magazine Name</TableCell>
              <TableCell>Subscription Date</TableCell>
              <TableCell>Subscription End Date</TableCell>
              <TableCell>Cancelled</TableCell>
              <TableCell>Cancellation Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.value?.map((subscription) => (
              <SubscriptionRow
                key={subscription.id}
                id={subscription.id}
                name={subscription.magazine.name}
                startDate={subscription.startDate}
                endDate={subscription.endDate}
                isCancelled={subscription.isCancelled}
                cancellationDate={subscription.cancellationDate}
                onChange={() => state.retry()}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SubscriptionList;
