using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SharedDeskConnect.Models;

namespace SharedDeskConnect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        [Route("GetUsers")]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return _context.Users.ToList();
        }

        // GET: api/User/1
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpGet("username/{username}")]
        public ActionResult<User> GetUserByUsername(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                return NoContent();
            }
            return user;
        }

        // POST: api/User
        [HttpPost]
        public ActionResult<User> AddUser(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUser), new { id = user.UserID }, user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User updatedUser)
        {
            if (id != updatedUser.UserID)
            {
                return BadRequest();
            }

            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Username = updatedUser.Username;
            user.Password = updatedUser.Password;
            user.UserType = updatedUser.UserType;
            user.Email = updatedUser.Email;

            _context.Users.Update(user);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<User> DeleteUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return BadRequest();

            }
            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent();
        }
    }
}