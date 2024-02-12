using Microsoft.EntityFrameworkCore;

namespace SharedDeskConnect.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Space> Spaces { get; set; }
        public DbSet<Rental> Rentals { get; set; }


    }
}
