using Backend.Model;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class RecipeServices : IRecipeServices
{
    private readonly RecipeDB _db;

    public RecipeServices(RecipeDB db)
    {
        _db = db;
    }

    public async Task<List<Recipe>> GetRecipesAsync()
    {
        return await _db.Recipe.ToListAsync();
    }

    public async Task<List<Recipe>> GetRandomRecipesAsync(string recipeType, int numOfDishes)
    {
        var recipes = await _db.Recipe.Where(r => r.RecipeType == recipeType).ToListAsync();
        if (recipes.Count < numOfDishes)
        {
            throw new Exception("Requested number of dishes exceeds available recipes.");
        }
        return Shuffle(recipes).Take(numOfDishes).ToList();
    }

    public async Task<Recipe?> GetRecipeByIdAsync(int recipeId)
    {
        return await _db.Recipe.FindAsync(recipeId);
    }

    public async Task<Recipe> AddRecipeAsync(Recipe recipe)
    {
        var existingRecipe = await _db.Recipe.FirstOrDefaultAsync(r => r.RecipeName == recipe.RecipeName);
        if (existingRecipe != null)
        {
            throw new Exception("Recipe name already exists.");
        }

        _db.Recipe.Add(recipe);
        await _db.SaveChangesAsync();
        return recipe;
    }

    public async Task<Recipe?> UpdateRecipeAsync(int recipeId, Recipe recipe)
    {
        var existingRecipe = await _db.Recipe.FindAsync(recipeId);
        if (existingRecipe == null)
        {
            return null;
        }

        existingRecipe.RecipeDescription = recipe.RecipeDescription;
        existingRecipe.RecipeIngredient = recipe.RecipeIngredient;
        existingRecipe.RecipeInstruction = recipe.RecipeInstruction;

        await _db.SaveChangesAsync();
        return existingRecipe;
    }

    public async Task<bool> DeleteRecipeByIdAsync(int recipeId)
    {
        var recipe = await _db.Recipe.FindAsync(recipeId);
        if (recipe == null)
        {
            return false;
        }

        _db.Recipe.Remove(recipe);
        await _db.SaveChangesAsync();
        return true;
    }

    // Fisher-Yates shuffle algorithm
    private static List<Recipe> Shuffle(List<Recipe> recipes)
    {
        var rng = new Random();
        int n = recipes.Count;
        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
            var temp = recipes[k];
            recipes[k] = recipes[n];
            recipes[n] = temp;
        }
        return recipes;
    }
}
