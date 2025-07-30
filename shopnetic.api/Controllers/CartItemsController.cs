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
    public class CartItemsController : ControllerBase
    {
        public readonly AppDbContext _context;

        public CartItemsController(AppDbContext context)
        {
            _context = context;
        }

        public CartDto ToDto(Cart cart) => new CartDto
        {
            Id = cart.Id,
            UserId = cart.UserId,
            Total = cart.Total,
            TotalDiscountedProducts = Math.Round(cart.TotalDiscountedProducts, 2),
            TotalProducts = cart.TotalProducts,
            TotalQuantity = cart.TotalQuantity,
            Items = cart.Items?
                .Select(c => new CartItemDto
                {
                    Id = c.Id,
                    CartId = c.CartId,
                    ProductId = c.ProductId,
                    Quantity = c.Quantity,
                    Total = c.Total,
                    DiscountedTotal = Math.Round(c.DiscountedTotal, 2)
                }).ToList() ?? new List<CartItemDto>()
        };

        [HttpPost]
        public async Task<ActionResult<CartItemRequestDto>> CreateCartItem(CartItemRequestDto request)
        {
            var userId = 1;

            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    Items = new List<CartItem>()
                };
                _context.Carts.Add(cart);
            }

            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null) return NotFound("Product not found");

            var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += request.Quantity;
                existingItem.Total = (decimal)(existingItem.Quantity * product.Price);
                existingItem.DiscountedTotal = (decimal)(existingItem.Total - (existingItem.Total * product.DiscountPercentage / 100));
            }
            else
            {
                var newItem = new CartItem
                {
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,
                    Total = (decimal)(request.Quantity * product.Price),
                    DiscountedTotal = (decimal)((request.Quantity * product.Price) - ((request.Quantity * product.Price) * product.DiscountPercentage / 100))
                };
                cart.Items.Add(newItem);
            }

            cart.TotalQuantity = cart.Items.Sum(i => i.Quantity);
            cart.Total = cart.Items.Sum(i => i.Total);
            cart.TotalProducts = cart.Items.Count;
            cart.TotalDiscountedProducts = cart.Items.Sum(i => i.DiscountedTotal);

            await _context.SaveChangesAsync();

            return Ok(ToDto(cart));
        }

        [HttpDelete("{productid}")]
        public async Task<ActionResult> DeleteCartItemByProductId(int productid)
        {
            var userId = 1;

            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
                return NotFound();

            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == cart.Id && ci.ProductId == productid);
            if (cartItem == null)
                return NotFound("Cart item not found");

            _context.CartItems.Remove(cartItem);

            cart.Total -= cartItem.Total;
            cart.TotalDiscountedProducts -= cartItem.DiscountedTotal;
            cart.TotalProducts -= 1;
            cart.TotalQuantity -= cartItem.Quantity;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{productId}")]
        public async Task<ActionResult> UpdateCartItem(int productId, CartItemRequestDto cartItemRequestDto)
        {
            if (productId != cartItemRequestDto.ProductId)
                return BadRequest("Mismatched product ID");

            var userId = 1;

            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
                return NotFound("Cart not found");

            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == cart.Id && ci.ProductId == productId);
            if (cartItem == null)
                return NotFound("Cart item not found");

            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                return NotFound("Product not found");

            cartItem.Quantity = cartItemRequestDto.Quantity;
            cartItem.Total = (decimal)(cartItem.Quantity * product.Price);
            cartItem.DiscountedTotal = (decimal)(cartItem.Total - (cartItem.Total * product.DiscountPercentage / 100));

            cart.TotalQuantity = cart.Items.Sum(i => i.Quantity);
            cart.Total = cart.Items.Sum(i => i.Total);
            cart.TotalProducts = cart.Items.Count;
            cart.TotalDiscountedProducts = cart.Items.Sum(i => i.DiscountedTotal);

            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}