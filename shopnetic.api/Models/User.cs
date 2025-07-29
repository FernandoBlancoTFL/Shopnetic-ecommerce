using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shopnetic.api.Models
{
    public class User
    {
        public int Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String UserName { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public String Country { get; set; }
        public DateTime Created_at { get; set; }
        public String Role { get; set; }
        public String Image { get; set; }
    }
}
