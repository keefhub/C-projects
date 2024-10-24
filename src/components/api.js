import axios from "axios";

const CreateRecipe = async (recipeData) => {
  console.log("recipe data received", recipeData);
  try {
    await axios.post("http://localhost:5252/recipe", recipeData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("recipe created successfully", recipeData);
  } catch (error) {
    console.error(error);
  }
};

export default CreateRecipe;
