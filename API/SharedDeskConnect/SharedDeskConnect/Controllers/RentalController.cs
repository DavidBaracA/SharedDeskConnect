using Microsoft.AspNetCore.Mvc;
using SharedDeskConnect.Models;

namespace SharedDeskConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly DataContext _context;
        public RentalController(DataContext context)
        {
            _context = context;
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

            // Actualizează proprietățile închirierii cu noile valori
            rental.UserPayerID = updatedRental.UserPayerID;
            rental.SpaceID = updatedRental.SpaceID;
            rental.RentalStartPeriod = updatedRental.RentalStartPeriod;
            rental.RentalEndPeriod = updatedRental.RentalEndPeriod;
            rental.ImageUrls = updatedRental.ImageUrls;


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