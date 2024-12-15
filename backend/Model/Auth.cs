using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    [Table("auth")]
    public class Auth
    {
        [Column("id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public required string Username { get; set; } 

        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; set; }

        public ICollection<Session> Sessions { get; set; } = null!;
    }
}