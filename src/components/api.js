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
    console.log("the retrieved recipes from backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export default { CreateRecipe, GetAllRecipes };
