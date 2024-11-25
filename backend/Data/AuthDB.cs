using Microsoft.EntityFrameworkCore;
using backend.Model;

namespace backend.Data
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