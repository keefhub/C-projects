using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    public class Session
    {
        [Key]
        public required string Id { get; set; }
        public int UserId { get; set; }
        public DateTime ExpiresAtTime { get; set; }
       
        public bool IsActive { get; set; }

         // ==== not sure what these are for ====
        public double SlidingExpirationInSeconds { get; set; }
        public DateTime AbsoluteExpiration { get; set; }

        [ForeignKey("UserId")]
        public Auth User { get; set; } = null!; //navigation property
    }
}
