using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace shopnetic.api.Models
{
    public class UserDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public String FirstName { get; set; }
        [Required]
        public String LastName { get; set; }
        [Required]
        public String UserName { get; set; }
        [Required]
        public String Email { get; set; }
        [Required]
        public String Password { get; set; }
        [Required]
        public String Country { get; set; }
        [Required]
        public DateTime Created_at { get; set; }
        [Required]
        public String Role { get; set; }
        [Required]
        public String Image { get; set; }
    }
}