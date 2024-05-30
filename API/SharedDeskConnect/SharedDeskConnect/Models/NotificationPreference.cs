namespace SharedDeskConnect.Models
{
    public class NotificationPreference
    {
        public int Id { get; set; }
        public int SpaceId { get; set; }
        public int UserId { get; set; }
        public string Email { get; set; }
    }
}
