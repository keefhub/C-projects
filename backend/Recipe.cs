public class Recipe 
{
    public int RecipeId { get; set; }
    public required string RecipeName { get; set; }
    public string? RecipeDescription { get; set; }
    public string? RecipeIngredients { get; set; }
    public required string RecipeInstructions { get; set; }
}