import { useEffect, useState } from "react";
import api from "../components/api";
import { Link } from "react-router-dom";

//material ui imports
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const recipes = await api.GetAllRecipes();
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
      {allRecipes.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {/* Grid container with spacing */}
          {allRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={3} key={recipe.recipeId}>
              {/* xs=12 (full width on small screens), sm=6 (two per row on medium), md=3 (four per row on large screens) */}
              <Box>
                <Card
                  variant="outlined"
                  sx={{
                    width: 350,
                    height: 200,
                    maxHeight: 350,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {recipe.recipeName}
                    </Typography>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      {recipe.recipeType}
                    </Typography>
                    <Typography>{recipe.recipeDescription}</Typography>
                    <Link to={`/recipe/${recipe.recipeId}`}>
                      <Button>Learn More</Button>
                    </Link>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default Home;
