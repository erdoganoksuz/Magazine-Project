import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import magazineService from "../Api";

interface Props {
  name: string;
  description: string;
  id: number;
  subscriptionId: number;
  monthlyPrice: number;
  onChange: () => void;
}

export default function MagazineCard({
  name,
  description,
  id,
  monthlyPrice,
  subscriptionId,
  onChange,
}: Props) {
  const handleUnsubscribe = async () => {
    await magazineService.delete(`/subscription/${subscriptionId}`);
    onChange();
  };

  const handleSubscribe = async () => {
    await magazineService.post(`/subscription/${id}`);
    onChange();
  };

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia
        sx={{ height: 350 }}
        image="/magazine.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name} - {monthlyPrice}$
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={!subscriptionId}
          variant="contained"
          color="error"
          size="small"
          onClick={handleUnsubscribe}
        >
          Cancel Subscription
        </Button>
        <Button
          disabled={Boolean(subscriptionId)}
          variant="contained"
          color="success"
          size="small"
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </CardActions>
    </Card>
  );
}
