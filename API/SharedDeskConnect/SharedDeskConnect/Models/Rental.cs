using System.ComponentModel.DataAnnotations;

namespace SharedDeskConnect.Models
{
    public class Rental
    {
        [Key]
        public int RentalID { get; set; }
        [Required]
        public int UserPayerID { get; set; }
        [Required]
        public int SpaceID { get; set; }
        [Required]
        public DateTime RentalStartPeriod { get; set; }
        [Required]
        public DateTime RentalEndPeriod { get; set; }
        public string ImageUrls { get; set; }
    }
}
