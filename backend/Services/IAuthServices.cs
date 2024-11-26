using Backend.Model;

namespace Backend.Services ;
public interface IAuthServices
{
    Task<string?> AuthenticateAsync( string username, string password);
    
    //create a new session
    Task<string> CreateSession(int userId);
    Task <Auth> ValidateSession(string sessionId);
    Task<string> EndSession(string sessionId);
}
