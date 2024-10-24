import { useEffect, useState, useCallback } from "react";
import api from "../components/api"; // Adjust the path to your API module

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const recipes = await api.GetAllRecipes();
      console.log("the retrieved by frontend:", recipes);
      // for (let i = 0; i < recipes.length; i++) {
      //   retrievedRecipes.push(recipes[i]);
      // }
      setAllRecipes(recipes);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {allRecipes.length > 0 ? (
        <ul>
          {allRecipes.map((recipe) => (
            <li key={recipe.recipeId}>{recipe.recipeName}</li>
          ))}
        </ul>
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default Home;
