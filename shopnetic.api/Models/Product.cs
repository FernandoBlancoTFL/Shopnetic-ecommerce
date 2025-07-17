using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shopnetic.api.Models
{
    public class Product
    {
        public int Id { get; set;}
        public String Title { get; set; }
        public String Description { get; set; }
        public String Category { get; set; }
        public double Price { get; set; }
        public double DiscountPercentage { get; set; }
        public double Rating { get; set; }
        public int Stock { get; set; }
    }
}