using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddDbContext<RecipeDB>(opt => opt.UseInMemoryDatabase("Recipes"));
// builder.Services.AddMySqlDataSource(builder.Configuration.GetConnectionString("Default")!);

//opening connection
builder.Services.AddDbContext<RecipeDB>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("Default"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("Default"))
    ));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// adding cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")  // React app's URL
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .AllowCredentials());
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "RecipeAPI";
    config.Title = "RecipeAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

app.UseCors("AllowReactApp");

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

Console.WriteLine("Opening Connection");

app.MapGet("/allRecipes", async (RecipeDB db) =>
    await db.Recipe.ToListAsync());


app.MapGet("/recipe/{recipeId}", async (int recipeId, RecipeDB db) =>
    await db.Recipe.FindAsync(recipeId)
        is Recipe recipe
            ? Results.Ok(recipe)
            : Results.NotFound());

app.MapPost("/recipe", async ([FromBody] Recipe recipe, [FromServices] RecipeDB db) =>
{
    Console.WriteLine($"Received recipe: {JsonSerializer.Serialize(recipe)}");
    db.Recipe.Add(recipe);
    await db.SaveChangesAsync();

    return Results.Created($"/recipe/{recipe.RecipeId}", recipe);
});

app.MapPut("/recipe/{recipeId}", async (int recipeId, Recipe inputRecipe, [FromServices] RecipeDB db) =>
{
    var recipe = await db.Recipe.FindAsync(recipeId);

    if (recipe is null) return Results.NotFound();

    recipe.RecipeType = inputRecipe.RecipeType;
    recipe.RecipeName = inputRecipe.RecipeName;
    recipe.RecipeDescription = inputRecipe.RecipeDescription;
    recipe.RecipeIngredient = inputRecipe.RecipeIngredient;
    recipe.RecipeInstruction = inputRecipe.RecipeInstruction;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/recipe/{recipeId}", async (int recipeId, [FromServices] RecipeDB db) =>
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