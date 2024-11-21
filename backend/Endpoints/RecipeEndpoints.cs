using Backend.Model;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Endpoints;

public static class RecipeEndpoints
{
    public static void MapRecipeEndpoints(this WebApplication app)
    {
        // Get all recipes for homepage
        app.MapGet("/recipe/homepage", async (IRecipeServices service) =>
        {
            var recipes = await service.GetRecipesAsync();
            return Results.Ok(recipes);
        });

        // Randomize recipes for homepage
        app.MapGet("/recipe", async (IRecipeServices service, [FromQuery] string? recipeType, [FromQuery] int? numOfDishes) =>
        {
            Console.WriteLine(recipeType);
            if (string.IsNullOrEmpty(recipeType) || !numOfDishes.HasValue)
            {
                return Results.BadRequest("Please provide the required values.");
            }

            try
            {
                var recipes = await service.GetRandomRecipesAsync(recipeType, numOfDishes.Value);
                return Results.Ok(recipes);
            }
            catch (Exception ex)
            {
                return Results.UnprocessableEntity(ex.Message);
            }
        });

        // Get a single recipe by ID
        app.MapGet("/recipe/{recipeId:int}", async (int recipeId, IRecipeServices service) =>
        {
            var recipe = await service.GetRecipeByIdAsync(recipeId);
            return recipe is not null ? Results.Ok(recipe) : Results.NotFound();
        });

        // Add a new recipe
        app.MapPost("/recipe", async (IRecipeServices service, Recipe recipe) =>
        {
            try
            {
                var newRecipe = await service.AddRecipeAsync(recipe);
                return Results.Created($"/recipe/{newRecipe.RecipeId}", newRecipe);
            }
            catch (Exception ex)
            {
                return Results.Conflict(ex.Message);
            }
        });

        // Update a recipe
        app.MapPut("/recipe/{recipeId:int}", async (int recipeId, Recipe inputRecipe, IRecipeServices service) =>
        {
            var updatedRecipe = await service.UpdateRecipeAsync(recipeId, inputRecipe);
            return updatedRecipe is not null ? Results.NoContent() : Results.NotFound();
        });

        // Delete a recipe
        app.MapDelete("/recipe/{recipeId:int}", async (int recipeId, IRecipeServices service) =>
        {
            var deleted = await service.DeleteRecipeByIdAsync(recipeId);
            return deleted ? Results.NoContent() : Results.NotFound();
        });
    }
}
