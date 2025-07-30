using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shopnetic.api.Data;
using shopnetic.api.Models;

namespace shopnetic.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        public UserDto ToDto(User user) => new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            UserName = user.UserName,
            Email = user.Email,
            Password = user.Password,
            Country = user.Country,
            Created_at = user.Created_at,
            Role = user.Role,
            Image = user.Image
        };

        public User ToEntity(UserDto userDto) => new User
        {
            Id = userDto.Id,
            FirstName = userDto.FirstName,
            LastName = userDto.LastName,
            UserName = userDto.UserName,
            Email = userDto.Email,
            Password = userDto.Password,
            Country = userDto.Country,
            Created_at = userDto.Created_at,
            Role = userDto.Role,
            Image = userDto.Image
        };

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(ToDto).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return ToDto(user);
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(UserDto userDto)
        {
            var user = ToEntity(userDto);
            _context.Add(user);
            await _context.SaveChangesAsync();

            userDto.Id = user.Id;
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, userDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, UserDto userDto)
        {
            if (id != userDto.Id)
                return BadRequest();

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.UserName = userDto.UserName;
            user.Email = userDto.Email;
            user.Password = userDto.Password;
            user.Country = userDto.Country;
            user.Role = userDto.Role;
            user.Image = userDto.Image;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}