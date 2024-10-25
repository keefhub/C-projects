import React from "react";
import { useParams, useNavigate } from "react-router-dom";

//import backend api
import api from "../components/api";

//import material ui components
import { Button } from "@mui/material";

const ViewRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (recipeId) => {
    console.log("recipeId: ", recipeId);
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this recipe?"
      );
      if (!confirmDelete) {
        return;
      }
      await api.DeleteRecipe(recipeId);
      navigate("/");
    } catch (error) {
      console.error("Error deleting recipe", error);
    }
  };

  return (
    <div>
      <h1>View Recipe</h1>
      <p>Recipe ID: {recipeId}</p>
      <Button onClick={() => handleDelete(recipeId)} variant="contained">
        Delete Recipe
      </Button>
    </div>
  );
};

export default ViewRecipe;
