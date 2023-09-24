import React, { FormEvent, useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import magazineService from "../Api";

interface Props {
  onSave: () => void;
}

const CreateMagazine = ({ onSave }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState(0);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      await magazineService.post(`/magazine`, {
        name,
        description,
        monthlyPrice,
      });
      onSave();
      clearForm();
    }
  };

  const validateForm = (): boolean => {
    if (!name.trim() || !description.trim() || monthlyPrice <= 0) {
      alert("All fields are required");
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setMonthlyPrice(0);
  };

  return (
    <form onSubmit={handleSave}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Monthly Price"
            type="number"
            value={monthlyPrice}
            onChange={(e) => setMonthlyPrice(Number(e.target.value))}
            required
            inputProps={{ min: "0" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginRight: "8px", height: "100%" }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateMagazine;
