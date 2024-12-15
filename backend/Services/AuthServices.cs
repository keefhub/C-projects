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

        public async Task<int?> AuthenticateAsync(string username, string password)
        {
            var user = await _context.Auth.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
            if (user == null) return null;
            // bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.Password);
            // if (!isPasswordValid) return null;

            return user.Id;
        }

        public async Task<string> CreateSession (int userId) 
        {
            var sessionId = Guid.NewGuid().ToString();
            var absoluteExpiration = DateTime.Now.AddMinutes(20);
            var slidingExpirationInSeconds = 1200;

            var session = new Session {
                Id = sessionId,
                UserId = userId,
                ExpiresAtTime = DateTime.Now.AddSeconds(slidingExpirationInSeconds),
                IsActive = true,
                SlidingExpirationInSeconds = slidingExpirationInSeconds,
                AbsoluteExpiration = absoluteExpiration
            };
            Console.WriteLine("UserId in CreateSession: " + userId);

            _context.sessioncache.Add(session);
            await _context.SaveChangesAsync();
            return session.Id;
        }

        public async Task<Auth> ValidateSession(string sessionId)
        {
            // Retrieve the session from the database
            var session = await _context.sessioncache.FirstOrDefaultAsync(s => s.Id == sessionId);
            
            if (session == null || session.ExpiresAtTime <= DateTime.Now)
            {
                // If no session is found or session has expired
                throw new Exception("Invalid session.");
            }

            // If the session is still valid, extend the expiration time based on sliding expiration
            session.ExpiresAtTime = DateTime.Now.AddSeconds(session.SlidingExpirationInSeconds);

            // Save the updated expiration time back to the database
            _context.sessioncache.Update(session);
            await _context.SaveChangesAsync();

            // Retrieve the user associated with the session
            var user = await _context.Auth.FindAsync(session.UserId);
            
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            return user;
        }


        public async Task<string> EndSession(string sessionId)
        {
            var session = await _context.sessioncache.FirstOrDefaultAsync(s => s.Id == sessionId);
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