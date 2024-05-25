using Microsoft.AspNetCore.Mvc;
using SharedDeskConnect.Models;
using SharedDeskConnect.Services;
using System.Linq;
using System.Threading.Tasks;

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
        public IActionResult RejectRental(int id)
        {
            var rental = _context.Rentals.Find(id);
            if (rental == null)
            {
                return NotFound();
            }

            rental.RentalApproval = "rejected";
            _context.Rentals.Update(rental);
            _context.SaveChanges();

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
}
