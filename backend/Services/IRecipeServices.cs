using Backend.Model;

namespace Backend.Services;

public interface IRecipeServices
{
    // Fetch all recipes
    Task<List<Recipe>> GetRecipesAsync();

    // Randomize recipes based on type and number of dishes
    Task<List<Recipe>> GetRandomRecipesAsync(string recipeType, int numOfDishes);

    // Fetch a recipe by its ID
    Task<Recipe?> GetRecipeByIdAsync(int recipeId);

    // Add a new recipe
    Task<Recipe> AddRecipeAsync(Recipe recipe);

    // Update an existing recipe
    Task<Recipe?> UpdateRecipeAsync(int recipeId, Recipe recipe);

    // Delete a recipe by its ID
    Task<bool> DeleteRecipeByIdAsync(int recipeId);
}
