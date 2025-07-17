using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace shopnetic.api.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        [Required]
        public String Title { get; set; }
        [Required]

        public String Description { get; set; }
        [Required]

        public String Category { get; set; }
        [Required]

        public double Price { get; set; }
        [Required]

        public double DiscountPercentage { get; set; }
        [Required]

        public double Rating { get; set; }
        [Required]

        public int Stock { get; set; }
    }
}
