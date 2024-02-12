using System.ComponentModel.DataAnnotations;

namespace SharedDeskConnect.Models
{
        public class User
        {
            [Key]
            public int UserID { get; set; }
            [Required]
            [MaxLength(100)]
            public string Username { get; set; }
            [Required]
            [MaxLength(100)]
            public string Password { get; set; }
            [Required]
            [MaxLength(50)]
            public string UserType { get; set; }
            [Required]
            [MaxLength(100)]
            public string Email { get; set; }
        }
}
