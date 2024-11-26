using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class AuthDB : DbContext
    {
        // Constructor accepting DbContextOptions
        public AuthDB(DbContextOptions<AuthDB> options)
            : base(options) { }

        // DbSet for the Auth entity
        public DbSet<Auth> Auth { get; set; } = null!;
    }
}