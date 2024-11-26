using Backend.Model;
using Backend.Services;

namespace Backend.Endpoints;

public static class AuthEndpoint
{
    public static void MapAuthEndpoints(this WebApplication app)
    {

        app.MapPost("/auth/login", async (AuthServices authService, Auth auth, HttpContext context) =>
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

            //creating session cookie
            var sessionId = await authService.CreateSession(auth.Id);

            //setting the session cookie
            context.Response.Cookies.Append("SessionId", sessionId, new CookieOptions
                {
                    HttpOnly = true, // Protect from JS access
                    Expires = DateTime.Now.AddMinutes(30),
                    SameSite = SameSiteMode.Strict
                });

            return Results.Ok(authenticatedUser);
        });

        app.MapGet("/auth/validate", async (AuthServices authService, HttpContext context) =>
        {
            var sessionId = context.Request.Cookies["SessionId"];

            if (string.IsNullOrEmpty(sessionId))
            {
                context.Response.Cookies.Delete("SessionId");
                return Results.Unauthorized();
            }

            try
            {
                var user = await authService.ValidateSession(sessionId);
                return Results.Ok(user);
            }
            catch (Exception e)
            {
                return Results.Unauthorized();
            }
        });

        app.MapPost("/auth/logout", async (AuthServices authService,HttpContext context) =>
        {
            var sessionId = context.Request.Cookies["SessionId"];
            if (string.IsNullOrEmpty(sessionId))
            {
                return Results.Unauthorized();
            }

            try
            {
                await authService.EndSession(sessionId);
                context.Response.Cookies.Delete("SessionId");
                return Results.Ok("Session ended.");
            }
            catch (Exception e)
            {
                return Results.Unauthorized();
            }
        });
    }
   
}