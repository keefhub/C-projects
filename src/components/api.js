import axios from "axios";

const CreateRecipe = async (recipeData) => {
  try {
    await axios.post("http://localhost:5252/recipe", recipeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
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
  console.log("recipeId: ", recipeId);
  try {
    await axios.delete(`http://localhost:5252/recipe/${recipeId}`);
  } catch (error) {
    console.error(error);
  }
};

export default { CreateRecipe, GetAllRecipes, DeleteRecipe };
