using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shopnetic.api.Models
{
    public class User
    {
        public int Id { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String userName { get; set; }
        public String email { get; set; }
        public String password { get; set; }
        public String country { get; set; }
        public DateTime created_at { get; set; }
        public String role { get; set; }
        public String image { get; set; }
    }
}