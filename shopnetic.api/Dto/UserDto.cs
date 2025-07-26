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
        public String firstName { get; set; }
        [Required]
        public String lastName { get; set; }
        [Required]
        public String userName { get; set; }
        [Required]
        public String email { get; set; }
        [Required]
        public String password { get; set; }
        [Required]
        public String country { get; set; }
        [Required]
        public DateTime created_at { get; set; }
        [Required]
        public String role { get; set; }
        [Required]
        public String image { get; set; }
    }
}