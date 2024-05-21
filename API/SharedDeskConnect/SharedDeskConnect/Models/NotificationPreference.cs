namespace SharedDeskConnect.Models
{
    public class NotificationPreference
    {
        public int Id { get; set; }
        public int SpaceId { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
    }
}
