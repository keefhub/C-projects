using Microsoft.EntityFrameworkCore;
using Backend.Data;

namespace Backend.Services
{
    public class AuthServices : IAuthService
    {
        private readonly AuthDB _context;

        public AuthServices(AuthDB context)
        {
            _context = context;
        }

        public async Task<string?> AuthenticateAsync(string username, string password)
        {
            var user = await _context.Auth.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
            return user == null ? null : user.Username;
        }
    }
}