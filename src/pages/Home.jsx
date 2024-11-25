import { useEffect, useState } from "react";
import api from "../components/api";
import { Link } from "react-router-dom";
import "../App.css";
import Randomizer from "../components/randomizer";

//material ui imports
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  //logout logic
  const navigate = useNavigate();
  const { logout } = useAuth();
  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {/* Container for header items i.e., search bar and randomizer */}
      <Box justifyContent="center">
        <Button onClick={handleOpen} color="secondary">
          Aiya.. Today I don't know what to cook..
        </Button>
        <Button onClick={onLogout} color="primary">
          Logout
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box className="modal-style">
            <Randomizer />
          </Box>
        </Modal>
      </Box>
      {/* Container for main page content */}
      <Box>
        {allRecipes.length > 0 ? (
          <Grid container spacing={2} justifyContent="center">
            {allRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={3} key={recipe.recipeId}>
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
      </Box>
    </div>
  );
};

export default Home;
