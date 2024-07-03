using Microsoft.AspNetCore.Mvc;
using SharedDeskConnect.Models;
using SharedDeskConnect.Services;

namespace SharedDeskConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IEmailService _emailService;

        public RentalController(DataContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // GET: api/Rental
        [HttpGet]
        [Route("GetRentals")]
        public ActionResult<IEnumerable<Rental>> GetRentals()
        {
            return _context.Rentals.ToList();
        }

        // GET: api/Rental/1
        [HttpGet("{id}")]
        public ActionResult<Rental> GetRental(int id)
        {
            var rental = _context.Rentals.Find(id);
            if (rental == null)
            {
                return NotFound();
            }
            return rental;
        }

        // POST: api/Rental
        [HttpPost]
        public ActionResult<Rental> AddRental(Rental rental)
        {
            if (rental == null)
            {
                return BadRequest();
            }
            _context.Rentals.Add(rental);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetRental), new { id = rental.RentalID }, rental);
        }

        // PUT: api/Rental/5
        [HttpPut("{id}")]
        public IActionResult UpdateRental(int id, Rental updatedRental)
        {
            if (id != updatedRental.RentalID)
            {
                return BadRequest();
            }

            var rental = _context.Rentals.Find(id);
            if (rental == null)
            {
                return NotFound();
            }

            rental.UserPayerID = updatedRental.UserPayerID;
            rental.SpaceID = updatedRental.SpaceID;
            rental.RentalStartPeriod = updatedRental.RentalStartPeriod;
            rental.RentalEndPeriod = updatedRental.RentalEndPeriod;
            rental.NumberOfPersons = updatedRental.NumberOfPersons;
            rental.RentalApproval = updatedRental.RentalApproval;
            rental.ContactNumber = updatedRental.ContactNumber;
            rental.CustomPrice = updatedRental.CustomPrice;

            _context.Rentals.Update(rental);
            _context.SaveChanges();

            return NoContent();
        }
        [HttpGet("UserRentals/{userId}")]
        public ActionResult<IEnumerable<RentalDetails>> GetUserRentals(int userId)
        {
            var rentals = _context.Rentals
                .Where(r => r.UserPayerID == userId && r.RentalApproval == "approved")
                .Join(_context.Spaces,
                    rental => rental.SpaceID,
                    space => space.SpaceID,
                    (rental, space) => new
                    {
                        Rental = rental,
                        Space = space,
                        Owner = _context.Users.FirstOrDefault(u => u.UserID == space.RenterUserId)
                    })
                .Select(rs => new RentalDetails
                {
                    RentalID = rs.Rental.RentalID,
                    RentalStartPeriod = rs.Rental.RentalStartPeriod,
                    RentalEndPeriod = rs.Rental.RentalEndPeriod,
                    CustomPrice = rs.Rental.CustomPrice,
                    NumberOfPersons = rs.Rental.NumberOfPersons,
                    ContactNumber = rs.Space.ContactNumber,
                    SpaceID = rs.Space.SpaceID,
                    SpaceName = rs.Space.Name,
                    Username = rs.Owner.Username != null ? rs.Owner.Username : "N/A",
                })
                .ToList();

            if (rentals == null)
            {
                return NotFound();
            }
            return rentals;
        }

        [HttpPut("ApproveRental/{id}")]
        public async Task<IActionResult> ApproveRental(int id)
        {
            var rental = _context.Rentals.Find(id);
            if (rental == null)
            {
                return NotFound();
            }

            var space = _context.Spaces.Find(rental.SpaceID);
            if (space == null)
            {
                return NotFound();
            }

            if (rental.RentalApproval != "approved")
            {
                rental.RentalApproval = "approved";
                _context.Rentals.Update(rental);
                await _context.SaveChangesAsync();

                var payer = _context.Users.Find(rental.UserPayerID); 
                if (payer != null)
                {
                    var emailContent = $@"
                    <p>Your rental has been approved!</p>
                    <p>The owner will contact you for payment procedures, but you have access to the space at the selected Date.</p>
                    <p>Thank you for using SharedDeskConnect!</p>";

                    await _emailService.SendEmailAsync(payer.Email, "Rental Approved", emailContent);
                }
            }

            return NoContent();
        }

        [HttpPut("RejectRental/{id}")]
        public async Task<IActionResult> RejectRental(int id)
        {
            var rental = _context.Rentals.Find(id);
            if (rental == null)
            {
                return NotFound();
            }

            var space = _context.Spaces.Find(rental.SpaceID);
            if (space == null)
            {
                return NotFound("Space not found.");
            }

            var payer = _context.Users.Find(rental.UserPayerID);
            if (payer != null)
            {
                var emailContent = $@"
                <p>Dear {payer.Username},</p>
                <p>We are sorry to inform you that your request to rent the space <strong>{space.Name}</strong> has been rejected and the reservation has been canceled by the owner.</p>
                <p>This usually happens when the space availability has changed</p>
                <p>Thank you for using SharedDeskConnect.</p>";

                await _emailService.SendEmailAsync(payer.Email, "Rental Rejected and Canceled", emailContent);
            }

            // Remove the rental from the database
            _context.Rentals.Remove(rental);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<Rental> DeleteRental(int id)
        {
            var rental = _context.Rentals.Find(id);

            if (rental == null)
            {
                return BadRequest();
            }
            _context.Rentals.Remove(rental);
            _context.SaveChanges();

            return NoContent();
        }
    }
    public class RentalDetails
    {
        public int RentalID { get; set; }
        public DateTime RentalStartPeriod { get; set; }
        public DateTime RentalEndPeriod { get; set; }
        public decimal CustomPrice { get; set; }
        public int NumberOfPersons { get; set; }
        public string ContactNumber { get; set; }
        public int SpaceID { get; set; }
        public string SpaceName { get; set; }
        public string Username { get; set; }
    }
}
