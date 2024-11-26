namespace Backend.Services ;
public interface IAuthServices
{
    Task<string?> AuthenticateAsync( string username, string password);
}