import axios from "axios";

const CreateRecipe = async (recipeData) => {
  try {
    await axios.post("http://localhost:5252/recipe", recipeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("Recipe already exists");
    }
    throw new Error("Failed to update database");
  }
};

const GetAllRecipes = async () => {
  try {
    const res = await axios.get("http://localhost:5252/recipe");
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

const DeleteRecipe = async (recipeId) => {
  try {
    await axios.delete(`http://localhost:5252/recipe/${recipeId}`);
  } catch (error) {
    console.error(error);
  }
};

const GetRecipeById = async (recipeId) => {
  try {
    const res = await axios.get(`http://localhost:5252/recipe/${recipeId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const EditRecipe = async (recipeId, recipeData) => {
  try {
    const res = await axios.put(
      `http://localhost:5252/recipe/${recipeId}`,
      recipeData
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

const GetFilteredRecipe = async (recipeType) => {
  try {
    const res = await axios.get(`http://localhost:5252/recipe`, {
      params: { RecipeType: recipeType },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export default {
  CreateRecipe,
  GetAllRecipes,
  DeleteRecipe,
  GetRecipeById,
  EditRecipe,
  GetFilteredRecipe,
};
