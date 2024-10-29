import React, { useState } from "react";

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
} from "@mui/material";

import api from "./api";

const Randomizer = () => {
  const [numberOfDishes, setNumberOfDishes] = useState("");
  const [dishType, setDishType] = useState("");
  const [retrievedRecipes, setRetrievedRecipes] = useState([]);

  const onRadioChange = (event) => {
    setDishType(event.target.value);
  };

  const handleSelectBoxChange = (event) => {
    setNumberOfDishes(event.target.value);
  };

  const onRandomize = async () => {
    try {
      const allRetrieved = await api.GetFilteredRecipe(dishType);
      setRetrievedRecipes(allRetrieved);
      console.log(retrievedRecipes);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
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
      </Box>
    </FormControl>
  );
};

export default Randomizer;
