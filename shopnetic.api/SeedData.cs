using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using shopnetic.api.Data;
using shopnetic.api.Models;

namespace shopnetic.api
{
    public static class SeedData
    {
        public static void Initialize(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetService<AppDbContext>();
            if (context == null || context.Products.Any())
                return;

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "products.json");

            if (!File.Exists(filePath))
                return;

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var jsonData = File.ReadAllText(filePath);
            var products = JsonSerializer.Deserialize<List<Product>>(jsonData, options);

            if (products != null && products.Any())
            {
                foreach (var product in products)
                {
                    if (string.IsNullOrWhiteSpace(product.Brand))
                    {
                        product.Brand = "N/A";
                    }
                }
                
                context.Products.AddRange(products);
                context.SaveChanges();
            }
        }
    }
}