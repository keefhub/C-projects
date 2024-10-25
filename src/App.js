import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AddRecipe from "./pages/AddRecipe";
import ViewRecipe from "./pages/ViewRecipe";
import EditRecipe from "./pages/EditRecipe";

//navigation
import DrawerMenu from "./components/navBar";

//styling
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <DrawerMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddRecipe" element={<AddRecipe />} />
        <Route path="recipe/:recipeId" element={<ViewRecipe />} />
        <Route path="recipe/:recipeId/edit" element={<EditRecipe />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
