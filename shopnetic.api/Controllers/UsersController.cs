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
            firstName = user.firstName,
            lastName = user.lastName,
            userName = user.userName,
            email = user.email,
            password = user.password,
            country = user.country,
            created_at = user.created_at,
            role = user.role,
            image = user.image
        };

        public User ToEntity(UserDto userDto) => new User
        {
            Id = userDto.Id,
            firstName = userDto.firstName,
            lastName = userDto.lastName,
            userName = userDto.userName,
            email = userDto.email,
            password = userDto.password,
            country = userDto.country,
            created_at = userDto.created_at,
            role = userDto.role,
            image = userDto.image
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

            user.firstName = userDto.firstName;
            user.lastName = userDto.lastName;
            user.userName = userDto.userName;
            user.email = userDto.email;
            user.password = userDto.password;
            user.country = userDto.country;
            user.role = userDto.role;
            user.image = userDto.image;

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