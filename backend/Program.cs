using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
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

//gets all the recipe for display at homepage
app.MapGet("/recipe/homepage", async (RecipeDB db) => {
    var recipeList = await db.Recipe.ToListAsync(); // retrieves all and return if no RecipeType is provided
    return recipeList;
});

//randomize the recipe for display at homepage and by the number of dishes
app.MapGet("/recipe", async (RecipeDB db, string? RecipeType, int? numOfDish) =>
{
    Console.WriteLine("the received recipe",RecipeType);
    //if user did not provide RecipeType or numOfDis return bad request
    if (string.IsNullOrEmpty(RecipeType) || !numOfDish.HasValue)
    {
        return Results.BadRequest("Please provide the required values");
    } 
    // Fetch the recipe based on RecipeType
    var recipeQuery = db.Recipe.Where(recipe => recipe.RecipeType == RecipeType);
    var recipeList = await recipeQuery.ToListAsync(); // retrieves all and return if no RecipeType is provided
    var recipeCount = await recipeQuery.CountAsync(); // count the number of recipe based on RecipeType

    if (numOfDish.Value > recipeCount) {
        return Results.BadRequest("Number of dishes is less than the number of recipe");
    }

    var randamizedRecipe = Shuffle(recipeList).Take(numOfDish.Value).ToList();

    //fisher-yates algo
    static List<Recipe> Shuffle(List<Recipe> list)
    {
        var rng = new Random();
        int n = list.Count;
        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
            Recipe value = list[k];
            list[k] = list[n];
            list[n] = value;
        }
        return list;
    }

    return Results.Ok(randamizedRecipe);
});

//get individual recipe
app.MapGet("/recipe/{recipeId}", async (int recipeId, RecipeDB db) =>
    await db.Recipe.FindAsync(recipeId)
        is Recipe recipe
            ? Results.Ok(recipe)
            : Results.NotFound());

// adding of recipe
app.MapPost("/recipe", async ([FromBody] Recipe recipe, [FromServices] RecipeDB db) =>
{
    var isExist = await db.Recipe.FirstOrDefaultAsync(r => r.RecipeName == recipe.RecipeName); 
    if (isExist != null) return Results.Conflict("Recipe name already exist");
    db.Recipe.Add(recipe);
    await db.SaveChangesAsync();

    return Results.Created($"/recipe/{recipe.RecipeId}", recipe);
});

//editing of recipe
app.MapPut("/recipe/{recipeId}", async (int recipeId, Recipe inputRecipe, [FromServices] RecipeDB db) =>
{
    var recipe = await db.Recipe.FindAsync(recipeId);

    if (recipe is null) return Results.NotFound();

    //recipe.RecipeType = inputRecipe.RecipeType;
    //recipe.RecipeName = inputRecipe.RecipeName;
    recipe.RecipeDescription = inputRecipe.RecipeDescription;
    recipe.RecipeIngredient = inputRecipe.RecipeIngredient;
    recipe.RecipeInstruction = inputRecipe.RecipeInstruction;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/recipe/{recipeId:int}", async (int recipeId, [FromServices] RecipeDB db) =>
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