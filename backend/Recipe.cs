public class Recipe 
{
    public int RecipeId { get; set; }
    public required string RecipeType { get; set; }
    public required string RecipeName { get; set; }
    public string? RecipeDescription { get; set; }
    public string? RecipeIngredient { get; set; }
    public required string RecipeInstruction { get; set; }
}