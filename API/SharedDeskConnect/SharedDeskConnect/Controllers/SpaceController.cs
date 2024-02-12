using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SharedDeskConnect.Models;

namespace SharedDeskConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpaceController : ControllerBase
    {
        private readonly DataContext _context;
        public SpaceController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Space
        [HttpGet]
        [Route("GetSpaces")]
        public ActionResult<IEnumerable<Space>> GetSpaces()
        {
            return _context.Spaces.ToList();
        }

        // GET: api/Space/1
        [HttpGet("{id}")]
        public ActionResult<Space> GetSpace(int id)
        {
            var space = _context.Spaces.Find(id);
            if (space == null)
            {
                return NotFound();
            }
            return space;
        }

        // POST: api/Space
        [HttpPost]
        public ActionResult<Space> AddSpace(Space space)
        {
            if (space == null)
            {
                return BadRequest();
            }
            _context.Spaces.Add(space);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetSpace), new { id = space.SpaceID }, space);
        }

        // PUT: api/Space/5
        [HttpPut("{id}")]
        public IActionResult UpdateSpace(int id, Space updatedSpace)
        {
            if (id != updatedSpace.SpaceID)
            {
                return BadRequest();
            }

            var space = _context.Spaces.Find(id);
            if (space == null)
            {
                return NotFound();
            }

            // Actualizează proprietățile spațiului cu noile valori
            space.Name = updatedSpace.Name;
            space.Location = updatedSpace.Location;
            space.Price = updatedSpace.Price;
            space.Description = updatedSpace.Description;
            space.RenterUserId = updatedSpace.RenterUserId;
            space.MaxCapacity = updatedSpace.MaxCapacity;

            _context.Spaces.Update(space);
            _context.SaveChanges();

            return NoContent();
        }



        [HttpDelete("{id}")]
        public ActionResult<Space> DeleteSpace(int id)
        {
            var space = _context.Spaces.Find(id);

            if (space == null)
            {
                return BadRequest();

            }
            _context.Spaces.Remove(space);
            _context.SaveChanges();

            return NoContent();
        }
    }
}