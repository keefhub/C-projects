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

  // const validateInputs = () => {
  //   const textInputTest = /^[^<>]*$/; // Regex to allow all characters except < and >
  //   const errors = [];

  //   if (!textInputTest.test(recipeName)) {
  //     errors.push("Recipe Name cannot contain < or >.");
  //   }
  //   if (!textInputTest.test(recipeDescription)) {
  //     errors.push("Description cannot contain < or >.");
  //   }
  //   if (!textInputTest.test(recipeIngredients)) {
  //     errors.push("Ingredients cannot contain < or >.");
  //   }
  //   if (!textInputTest.test(recipeInstructions)) {
  //     errors.push("Instructions cannot contain < or >.");
  //   }

  //   return errors;
  // };

  // const validateSubmit = async (e) => {
  //   e.preventDefault(); // Prevent form submission
  //   setErrorMessage(""); // Reset the error message

  //   // Run validation checks
  //   const errors = validateInputs();

  //   // If validation errors exist, stop submission
  //   if (errors.length > 0) {
  //     setErrorMessage(errors.join(" ")); // Show validation errors
  //     return;
  //   }
  // };

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
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add recipe. Please try again later.");
    }
    // Clear fields after submission if needed
    onCancel();
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
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
            color="secondary"
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
