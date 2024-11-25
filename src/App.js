import { BrowserRouter, Routes, Route } from "react-router-dom";

//auth
import { AuthProvider } from "./Context/AuthContext";

//pages
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AddRecipe from "./pages/AddRecipe";
import ViewRecipe from "./pages/ViewRecipe";
import EditRecipe from "./pages/EditRecipe";
import Login from "./pages/Login";

//navigation
import DrawerMenu from "./components/navBar";

//styling
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <DrawerMenu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/AddRecipe" element={<AddRecipe />} />
          <Route path="recipe/:recipeId" element={<ViewRecipe />} />
          <Route path="recipe/:recipeId/edit" element={<EditRecipe />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
