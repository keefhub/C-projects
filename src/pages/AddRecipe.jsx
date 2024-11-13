import React, { useState } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  Box,
  Button,
  Alert,
} from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import api from "../components/api";

const AddRecipe = () => {
  const options = ["vegetarian", "non-vegetarian"];

  const [inputOption, setInputOption] = useState(options[0]);
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onCancel = () => {
    setInputOption(options[0]);
    setRecipeName("");
    setRecipeDescription("");
    setRecipeIngredients("");
    setRecipeInstructions("");
    setErrorMessage(""); // Clear error message on cancel
  };

  const onClickSubmit = async () => {
    //validateSubmit();
    //If validation is successful, try to submit the recipe
    const recipeData = {
      recipeType: inputOption,
      recipeName: recipeName,
      recipeDescription: recipeDescription,
      recipeIngredient: recipeIngredients,
      recipeInstruction: recipeInstructions,
    };
    console.log(recipeData);

    try {
      await api.CreateRecipe(recipeData);
      // Clear fields after submission if needed
      onCancel();
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to add recipe. Please try again later."
      );
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={3}>
          <Autocomplete
            value={inputOption}
            inputValue={inputOption}
            onInputChange={(event, newInputValue) => {
              setInputOption(newInputValue);
            }}
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Recipe Type" />
            )}
          />
          <TextField
            id="outlined-basic"
            label="Recipe Name"
            variant="outlined"
            required
            onChange={(e) => {
              setRecipeName(e.target.value);
            }}
            value={recipeName}
          />
        </Stack>
        <Box>
          <TextField
            multiline
            maxRows={5}
            label="Recipe Description (optional)"
            sx={{ width: 550 }}
            onChange={(e) => setRecipeDescription(e.target.value)}
            value={recipeDescription}
          />
        </Box>
        <Box>
          <TextField
            multiline
            maxRows={5}
            label="Recipe Ingredients (optional)"
            sx={{ width: 550 }}
            onChange={(e) => setRecipeIngredients(e.target.value)}
            value={recipeIngredients}
          />
        </Box>
        <Box>
          <TextField
            multiline
            maxRows={5}
            required
            label="Recipe Instructions"
            sx={{ width: 550 }}
            onChange={(e) => setRecipeInstructions(e.target.value)}
            value={recipeInstructions}
          />
        </Box>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Stack
          direction="row"
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              onClickSubmit();
            }}
          >
            Add Recipe
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onCancel}
            startIcon={<ClearAllIcon />}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddRecipe;
