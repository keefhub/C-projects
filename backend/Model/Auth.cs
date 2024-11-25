using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Auth
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public required string Username { get; set; } 

        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; set; }
    }
}