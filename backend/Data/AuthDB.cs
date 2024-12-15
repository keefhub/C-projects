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
        public DbSet<Session> sessioncache { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Session>()
            .HasOne(s => s.User)
            .WithMany(a => a.Sessions)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);
         }
    }
}