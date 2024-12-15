import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

//import backend api
import api from "../components/api";

//import material ui components
import { Button, Stack, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const ViewRecipe = () => {
  const [retrievedRecipe, setRetrievedRecipe] = useState([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const handleRecipeData = async (recipeId) => {
    try {
      const recipeData = await api.GetRecipeById(recipeId);
      setRetrievedRecipe(recipeData);
      return recipeData;
    } catch (error) {
      console.error("Error fetching recipe data", error);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this recipe?"
      );
      if (!confirmDelete) {
        return;
      }
      await api.DeleteRecipe(recipeId);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting recipe", error);
    }
  };

  useEffect(() => {
    handleRecipeData(recipeId);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Stack spacing={10} direction="column">
        <Stack spacing={3} direction="column">
          <Typography variant="h3" component="h1">
            {retrievedRecipe.recipeName}
          </Typography>
          <Typography component="p">
            <span style={{ fontWeight: "bold", paddingRight: 10 }}>
              Recipe Type:
            </span>
            {retrievedRecipe.recipeType}
          </Typography>
          <Typography variant="body1" component="p">
            <span style={{ fontWeight: "bold", paddingRight: 5 }}>
              Recipe Description:
            </span>{" "}
            {retrievedRecipe.recipeDescription}
          </Typography>
          <Typography variant="body1" component="p">
            <span style={{ fontWeight: "bold", paddingRight: 5 }}>
              Ingredients Required:
            </span>{" "}
            {retrievedRecipe.recipeIngredient}
          </Typography>
          <Typography variant="body1" component="p">
            <span style={{ fontWeight: "bold", paddingRight: 5 }}>
              Directions:
            </span>{" "}
            {retrievedRecipe.recipeInstruction}
          </Typography>
        </Stack>

        <Stack spacing={2} direction="row">
          <Link to={`/recipe/${recipeId}/edit`}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditNoteIcon />}
            >
              Edit Recipe
            </Button>
          </Link>

          <Button
            onClick={() => handleDelete(recipeId)}
            variant="contained"
            color="error"
            startIcon={<DeleteSweepIcon />}
          >
            Delete Recipe
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default ViewRecipe;
