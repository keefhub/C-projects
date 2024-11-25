using Backend.Model;
using Backend.Services;

namespace Backend.Endpoints;

public static class AuthEndpoint
{
    public static async Task AuthenticateAsync(HttpContext context)
    {
        var username = context.Request.Query["Username"].ToString();
        var password = context.Request.Query["Password"].ToString();

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync("Username and password are required");
            return;
        }

        var authService = context.RequestServices.GetRequiredService<IAuthService>();
        var authenticatedUser = await authService.AuthenticateAsync(username, password);

        if (authenticatedUser == null)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Invalid username or password");
            return;
        }

        context.Response.StatusCode = 200;
        await context.Response.WriteAsync($"Authenticated as {authenticatedUser}");
    }
}