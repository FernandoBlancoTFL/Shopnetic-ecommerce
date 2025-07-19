using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shopnetic.api.Data;
using shopnetic.api.Dto;
using shopnetic.api.Models;

namespace shopnetic.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        private ProductDto ToDto(Product product) => new ProductDto
        {
            Id = product.Id,
            Title = product.Title,
            Description = product.Description,
            Category = product.Category,
            Price = product.Price,
            DiscountPercentage = product.DiscountPercentage,
            Rating = product.Rating,
            Stock = product.Stock,
            Brand = product.Brand,
            Sku = product.Sku,
            Weight = product.Weight,
            Dimensions = product.Dimensions,
            WarrantyInformation = product.WarrantyInformation,
            ShippingInformation = product.ShippingInformation,
            AvailabilityStatus = product.AvailabilityStatus,
            Reviews = product.Reviews?
                .Select(r => new ReviewDto
                {
                    Rating = r.Rating,
                    Comment = r.Comment,
                    Date = r.Date,
                    ReviewerName = r.ReviewerName,
                    ReviewerEmail = r.ReviewerEmail
                }).ToList() ?? new List<ReviewDto>(),
            ReturnPolicy = product.ReturnPolicy,
            MinimumOrderQuantity = product.MinimumOrderQuantity,
            Meta = product.Meta,
            Images = product.Images?.Select(i => i.Url).ToList() ?? new List<string>(),
            Thumbnail = product.Thumbnail
        };

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.Reviews)
                .Include(p => p.Images)
                .ToListAsync();
            return products.Select(ToDto).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Reviews)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return ToDto(product);
        }
    }
}
