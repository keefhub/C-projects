using Backend.Data;
using Backend.Services;
using Backend.Endpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// === Configure Services ===
// Add Database Context
builder.Services.AddDbContext<RecipeDB>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("Default"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("Default"))
    ));
builder.Services.AddDbContext<AuthDB>(options =>
options.UseMySql(
    builder.Configuration.GetConnectionString("Default"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("Default"))
    ));

// === storing of session cache in MySQL ===
builder.Services.AddDistributedMySqlCache(options =>
{
    options.ConnectionString = builder.Configuration.GetConnectionString("Default");
    options.TableName = "sessioncache";
});

// === Add session cookies ===
builder.Services.AddSession(options =>
{
    //options.Cookie.Name = "RecipeAPI.Session";
    options.IdleTimeout = TimeSpan.FromMinutes(20);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    // if (builder.Environment.IsProduction())
    // {
    //     options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Ensure secure cookies in production
    // }
});

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Add CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:3000") // React app's URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
              .AllowCredentials());
});

// === Add Swagger (OpenAPI) ===
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "RecipeAPI";
    config.Title = "RecipeAPI v1";
    config.Version = "v1";
});

// === Register Services ===
builder.Services.AddScoped<IRecipeServices, RecipeServices>();
builder.Services.AddScoped<IAuthServices, AuthServices>();

var app = builder.Build();

// === Configure Middleware ===
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

// Call an extension method to map endpoints
app.MapRecipeEndpoints(); 
app.MapAuthEndpoints(); 

//use session and cookies
app.UseSession();

// app.UseHttpsRedirection();


app.Run();
