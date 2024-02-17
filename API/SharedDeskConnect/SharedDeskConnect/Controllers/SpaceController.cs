using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            space.City = updatedSpace.City;
            space.Price = updatedSpace.Price;
            space.Description = updatedSpace.Description;
            space.RenterUserId = updatedSpace.RenterUserId;
            space.MaxCapacity = updatedSpace.MaxCapacity;
            space.Adress = updatedSpace.Adress;



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

        [HttpPost("{id}/UploadImages")]
        public async Task<IActionResult> UploadImage(int id, List<IFormFile> files)
        {
            var space = await _context.Spaces.FindAsync(id);
            if (space == null)
            {
                return NotFound();
            }

            // Check if files are null or empty
            if (files == null || files.Count == 0)
            {
                return BadRequest("Invalid files");
            }

            foreach (var file in files)
            {
                // Convert uploaded file to byte array
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var image = new Image { ImageValue = memoryStream.ToArray(), SpaceID = id };
                    _context.Images.Add(image);
                }
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/Space/{id}/Images
        [HttpGet("{id}/Images")]
        public async Task<IActionResult> GetImages(int id)
        {
            var images = await _context.Images.Where(i => i.SpaceID == id).ToListAsync();
            if (images == null || images.Count == 0)
            {
                return NotFound("No images found for the specified space");
            }

            // Convert image data to base64 strings
            var imageDataList = images.Select(i => Convert.ToBase64String(i.ImageValue)).ToList();
            return Ok(imageDataList);
        }
    }
}