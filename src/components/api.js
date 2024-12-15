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
    const res = await axios.get("http://localhost:5252/recipe/homepage");
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

const GetRandomizedRecipe = async (recipeType, numberOfDishes) => {
  try {
    const res = await axios.get(`http://localhost:5252/recipe`, {
      params: {
        recipeType: recipeType,
        numOfDishes: numberOfDishes,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error("Please provide a valid recipe type.");
        case 422:
          throw new Error(
            "Unprocessable: Number of dishes is less than the number of recipe"
          );
        default:
          throw new Error("Failed to fetch data.");
      }
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};

const AuthenticateUser = async (username, password) => {
  try {
    const res = await axios.post("http://localhost:5252/auth/login", {
      Username: username,
      Password: password,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
    switch (error.response.status) {
      case 400:
        throw new Error("Please provide a valid username and password");
      case 401:
        throw new Error("Invalid username or password");
      default:
        throw new Error("Failed to authenticate user");
    }
  }
};

export default {
  CreateRecipe,
  GetAllRecipes,
  DeleteRecipe,
  GetRecipeById,
  EditRecipe,
  GetFilteredRecipe,
  GetRandomizedRecipe,
  AuthenticateUser,
};
