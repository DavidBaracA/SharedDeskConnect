using System.ComponentModel.DataAnnotations;

namespace SharedDeskConnect.Models
{
    public class Image
    {
        [Key]
        public int ImageID { get; set; }
        [Required]
        public byte[] ImageValue { get; set; }
        [Required]
        public int SpaceID { get; set; }
    }
}