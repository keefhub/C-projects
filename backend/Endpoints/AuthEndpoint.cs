using Backend.Model;
using Backend.Services;

namespace Backend.Endpoints;

public static class AuthEndpoint
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/auth", async (IAuthServices authService, Auth auth ) =>
        {
            if (string.IsNullOrEmpty(auth.Username) || string.IsNullOrEmpty(auth.Password))
            {
                return Results.BadRequest("Please provide the required values.");
            }

            var authenticatedUser = await authService.AuthenticateAsync(auth.Username, auth.Password);

            if (authenticatedUser == null)
            {
                return Results.Unauthorized();
            }

            return Results.Ok(authenticatedUser);
        });
    }
   
}