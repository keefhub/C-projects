using Newtonsoft.Json;

namespace Backend.Services ;
public interface IAuthService
{
    Task<string?> AuthenticateAsync( string username, string password);
}