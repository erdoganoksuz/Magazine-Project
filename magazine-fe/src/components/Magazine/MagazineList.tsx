import { useAsyncFn, useAsyncRetry } from "react-use";
import { Box, CircularProgress, Grid } from "@mui/material";
import magazineService from "../Api";
import { useState } from "react";
import MagazineCard from "./MagazineCard";
import CreateMagazine from "./CreateMagazine";

interface Magazine {
  id: number;
  description: string;
  name: string;
  isSubscribed: boolean;
  monthlyPrice: number;
  subscriptionId: number;
}

interface Subscription {
  magazine: { id: number };
  isCancelled: boolean;
  id: number;
}

export const MagazineList = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);

  const state = useAsyncRetry(async () => {
    const [magazineResponse, subscriptionResponse] = await Promise.all([
      magazineService.get("/magazine"),
      magazineService.get("/subscription"),
    ]);

    setMagazines(
      magazineResponse.data.map((magazine: Partial<Magazine>) => {
        const subscription = subscriptionResponse.data.find(
          (subscription: Subscription) =>
            subscription.isCancelled === false &&
            subscription.magazine.id === magazine.id
        );

        if (subscription) {
          magazine.subscriptionId = subscription.id;
        }

        return magazine;
      })
    );
  }, []);

  if (state.loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <h3>Create Magazine</h3>
      <CreateMagazine onSave={() => state.retry()} />
      <Box mb={4}>
        <h3>Magazine Count : {magazines.length}</h3>
        <Grid container spacing={2}>
          {magazines.map((magazine) => (
            <Grid key={magazine.id} item md={6} xs={12}>
              <MagazineCard
                id={magazine.id}
                name={magazine.name}
                description={magazine.description}
                subscriptionId={magazine.subscriptionId}
                monthlyPrice={magazine.monthlyPrice}
                onChange={() => state.retry()}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
