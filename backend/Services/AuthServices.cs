using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;

namespace Backend.Services
{
    public class AuthServices : IAuthServices
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

        public async Task<string> CreateSession (int userId) 
        {
            var sessionId = Guid.NewGuid().ToString();
            var expiryDate = DateTime.Now.AddMinutes(20);

            var session = new Session {
                SessionId = sessionId,
                UserId = userId,
                ExpiryDate = expiryDate,
                IsActive = true
            };
            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();
            return session.SessionId;
        }

        public async Task<Auth> ValidateSession(string sessionId)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(s => s.SessionId == sessionId && s.ExpiryDate > DateTime.Now);
            if (session == null)
            {
                throw new Exception("Invalid session.");
            }

            var user = await _context.Auth.FindAsync(session.UserId);
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            return user;
        }

        public async Task<string> EndSession(string sessionId)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(s => s.SessionId == sessionId);
            if (session == null)
            {
                throw new Exception("Invalid session.");
            }

            session.IsActive = false;
            await _context.SaveChangesAsync();
            return "Session ended.";
        }

    }
}