import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../components/api";

//material ui imports
import { Stack, Typography, TextField, Box } from "@mui/material";

const EditRecipe = () => {
  const [retrievedRecipe, setRetrievedRecipe] = useState([]);
  const { recipeId } = useParams();

  const handleRecipeData = async (recipeId) => {
    try {
      const recipeData = await api.GetRecipeById(recipeId);
      console.log("Recipe Data", recipeData);
      setRetrievedRecipe(recipeData);
      return recipeData;
    } catch (error) {
      console.error("Error fetching recipe data", error);
    }
  };

  useEffect(() => {
    handleRecipeData(recipeId);
  }, []);

  return (
    <Box>
      <Stack spacing={2} direction="column" alignItems={"center"}>
        <Typography variant="h4" sx={{ paddingBottom: 5 }}>
          Recipe: {retrievedRecipe.recipeName}
        </Typography>
        <Stack spacing={3} direction="column">
          <Stack spacing={2} direction="row" alignItems={"center"}>
            <Typography
              variant="p"
              component="p"
              fontWeight={"bold"}
              sx={{ width: 150 }}
            >
              Recipe Type:
            </Typography>
            <TextField
              id="recipeType"
              value={retrievedRecipe.recipeType}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ width: 450 }}
            />
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              variant="body1"
              component="p"
              fontWeight="bold"
              sx={{ width: 150 }}
            >
              Recipe Name:
            </Typography>
            <TextField
              id="recipeName"
              value={retrievedRecipe.recipeName}
              variant="outlined"
              sx={{ width: 450 }}
            />
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              variant="body1"
              component="p"
              fontWeight="bold"
              sx={{ width: 150 }}
            >
              Description:
            </Typography>
            <TextField
              id="recipeDescription"
              value={retrievedRecipe.recipeDescription}
              variant="outlined"
              multiline
              minRows={3} // To allow for longer descriptions
              sx={{ width: 450 }}
            />
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              variant="body1"
              component="p"
              fontWeight="bold"
              sx={{ width: 150 }}
            >
              Ingredients:
            </Typography>
            <TextField
              id="recipeIngredient"
              value={retrievedRecipe.recipeIngredient}
              variant="outlined"
              multiline
              minRows={2}
              sx={{ width: 450 }}
            />
          </Stack>

          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              variant="body1"
              component="p"
              fontWeight="bold"
              sx={{ width: 150 }}
            >
              Directions:
            </Typography>
            <TextField
              id="recipeInstruction"
              value={retrievedRecipe.recipeInstruction}
              variant="outlined"
              multiline
              minRows={3}
              sx={{ width: 450 }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditRecipe;
