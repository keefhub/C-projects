namespace Backend.Model
{
    public class Session
    {
        public required string SessionId { get; set; }
        public int UserId { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsActive { get; set; }
    }
}
