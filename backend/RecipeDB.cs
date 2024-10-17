using Microsoft.EntityFrameworkCore;

class RecipeDB : DbContext
{
    public RecipeDB(DbContextOptions<RecipeDB> options)
        : base(options) { }

    public DbSet<Recipe> Recipe => Set<Recipe>();
}