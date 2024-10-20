using Microsoft.EntityFrameworkCore;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<RecipeDB>(opt => opt.UseInMemoryDatabase("Recipes"));
builder.Services.AddMySqlDataSource(builder.Configuration.GetConnectionString("Default")!);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// adding cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")  // React app's URL
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "RecipeAPI";
    config.Title = "RecipeAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "RecipeAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapGet("/allRecipes", async (RecipeDB db) =>
    await db.Recipe.ToListAsync());


app.MapGet("/recipe/{recipeId}", async (int recipeId, RecipeDB db) =>
    await db.Recipe.FindAsync(recipeId)
        is Recipe recipe
            ? Results.Ok(recipe)
            : Results.NotFound());

app.MapPost("/recipe", async (Recipe recipe, RecipeDB db) =>
{
    db.Recipe.Add(recipe);
    await db.SaveChangesAsync();

    return Results.Created($"/recipe/{recipe.RecipeId}", recipe);
});

app.MapPut("/recipe/{recipeId}", async (int recipeId, Recipe inputRecipe, RecipeDB db) =>
{
    var recipe = await db.Recipe.FindAsync(recipeId);

    if (recipe is null) return Results.NotFound();

    recipe.RecipeName = inputRecipe.RecipeName;
    recipe.RecipeDescription = inputRecipe.RecipeDescription;
    recipe.RecipeIngredient = inputRecipe.RecipeIngredient;
    recipe.RecipeInstruction = inputRecipe.RecipeInstruction;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/recipe/{recipeId}", async (int recipeId, RecipeDB db) =>
{
    if (await db.Recipe.FindAsync(recipeId) is Recipe recipe)
    {
        db.Recipe.Remove(recipe);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();