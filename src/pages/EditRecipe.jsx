import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../components/api";

//material ui imports
import { Stack, Typography, TextField, Box, Button } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const EditRecipe = () => {
  const [retrievedRecipe, setRetrievedRecipe] = useState([]);
  const [inputDescription, setInputDescription] = useState("");
  const [inputIngredient, setInputIngredient] = useState("");
  const [inputInstruction, setInputInstruction] = useState("");
  // not used but need to send in anyway
  const [recipeType, setRecipeType] = useState("");
  const [recipeName, setRecipeName] = useState("");

  const { recipeId } = useParams();
  const navigate = useNavigate();

  const handleRecipeData = async (recipeId) => {
    try {
      const recipeData = await api.GetRecipeById(recipeId);
      setRetrievedRecipe(recipeData);
      setInputDescription(recipeData.recipeDescription || "");
      setInputIngredient(recipeData.recipeIngredient || "");
      setInputInstruction(recipeData.recipeInstruction || "");
      setRecipeType(recipeData.recipeType || "");
      setRecipeName(recipeData.recipeName || "");
      return recipeData;
    } catch (error) {
      console.error("Error fetching recipe data", error);
    }
  };

  const handleEditData = async () => {
    const recipeData = {
      recipeName: recipeName,
      recipeType: recipeType,
      recipeDescription: inputDescription,
      recipeIngredient: inputIngredient,
      recipeInstruction: inputInstruction,
    };
    console.log("Recipe Data", recipeData, "for recipeId", recipeId);
    try {
      await api.EditRecipe(recipeId, recipeData);
      navigate(`/recipe/${recipeId}`);
    } catch (error) {
      console.error("Error editing recipe data", error);
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
              Description:
            </Typography>
            <TextField
              id="recipeDescription"
              value={inputDescription}
              variant="outlined"
              multiline
              minRows={3}
              onChange={(e) => setInputDescription(e.target.value)}
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
              value={inputIngredient}
              variant="outlined"
              multiline
              minRows={3}
              onChange={(e) => setInputIngredient(e.target.value)}
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
              value={inputInstruction}
              variant="outlined"
              multiline
              minRows={3}
              onChange={(e) => setInputInstruction(e.target.value)}
              sx={{ width: 450 }}
            />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SaveAltIcon />}
          onClick={handleEditData}
        >
          Save Edit
        </Button>
      </Stack>
    </Box>
  );
};

export default EditRecipe;
