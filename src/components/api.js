import axios from "axios";

const CreateRecipe = async (recipeData) => {
  try {
    const res = await axios.post("http://localhost:5252/recipe", recipeData);
    return res.data;
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};

export default CreateRecipe;
