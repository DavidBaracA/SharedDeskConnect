using System.ComponentModel.DataAnnotations;

namespace SharedDeskConnect.Models
{
    public class Space
    {
        [Key]
        public int SpaceID { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(100)]
        public string City { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int MaxCapacity { get; set; }
        public string Description { get; set; }
        [Required]
        public int RenterUserId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Adress { get; set; }

    }
}
