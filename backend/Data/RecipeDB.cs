using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class RecipeDB : DbContext
    {
        // Constructor accepting DbContextOptions
        public RecipeDB(DbContextOptions<RecipeDB> options)
            : base(options) { }

        // DbSet for the Recipe entity
        public DbSet<Recipe> Recipe { get; set; } = null!;
    }
}
