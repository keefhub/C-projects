import React, { useState, useEffect } from "react";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
} from "@mui/material";

import api from "./api";

const Randomizer = () => {
  const [numberOfDishes, setNumberOfDishes] = useState("");
  const [dishType, setDishType] = useState("");
  const [retrievedRecipes, setRetrievedRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const onRadioChange = (event) => {
    setDishType(event.target.value);
  };

  const handleSelectBoxChange = (event) => {
    setNumberOfDishes(event.target.value);
  };

  const onRandomize = async () => {
    setErrorMessage("");
    setRetrievedRecipes([]);
    try {
      const allRetrieved = await api.GetRandomizedRecipe(
        dishType,
        numberOfDishes
      );
      setRetrievedRecipes(allRetrieved);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    console.log("Updated retrievedRecipes:", retrievedRecipes);
  }, [retrievedRecipes]);

  return (
    <FormControl>
      <Box>
        <FormLabel fullWidth>Randomizer</FormLabel>
        <RadioGroup row name="row-radio-buttons-group">
          <FormControlLabel
            value="vegetarian"
            control={<Radio />}
            label="vegatarian"
            onChange={onRadioChange}
          />
          <FormControlLabel
            value="non-vegetarian"
            control={<Radio />}
            label="non-vegetarian"
            onChange={onRadioChange}
          />
        </RadioGroup>
      </Box>

      <Box sx={{ paddingTop: 3 }}>
        <Typography>Number of Dishes:</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={numberOfDishes}
          label="numberOfDishes"
          onChange={handleSelectBoxChange}
        >
          {[...Array(9)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex-start" sx={{ paddingTop: 3 }}>
        <Button variant="contained" color="secondary" onClick={onRandomize}>
          Randomize Now!
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Box>

      <Box
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          padding: 2,
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {retrievedRecipes.length > 0 ? (
          <Grid2 container spacing={2} justifyContent="center">
            <Typography>Retrieved Recipes:</Typography>
            {retrievedRecipes.map((recipe) => (
              <Grid2 item xs={12} sm={6} md={3} key={recipe.recipeId}>
                <Card
                  variant="outlined"
                  sx={{
                    width: 250,
                    height: 150,
                    maxHeight: 350,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold">
                      {recipe.recipeName}
                    </Typography>
                    <Typography fontSize={16}>
                      Ingredients: {recipe.recipeIngredient}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <Typography></Typography>
        )}
      </Box>
    </FormControl>
  );
};

export default Randomizer;
