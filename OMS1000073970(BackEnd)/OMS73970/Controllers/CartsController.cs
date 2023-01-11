using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMS73970.models;
using OMS73970.Repository;

namespace OMS73970.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartRepository _cartRepo;

        public CartsController(ICartRepository cartRepo)
        {
            _cartRepo = cartRepo;

        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart()
        {
            try
            {
                return Ok(await _cartRepo.GetAllCartItems());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }
        }

        // GET: api/Carts/5
        [HttpGet("{cartId}")]
        public async Task<ActionResult<Cart>> GetCart([FromRoute] int cartId)
        {
            try
            {
                var result = await _cartRepo.GetCartByCartId(cartId);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }
        }

        [HttpGet("customer/{custId}")]
        public  ActionResult<IEnumerable<Cart>> GetCartByCustId([FromRoute] int custId)
        {
            try
            {
                var result =  _cartRepo.GetCartByCustomerId(custId);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }
        }

        // PUT: api/Carts/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Cart>> PutCart([FromRoute] int id, [FromBody] Cart cart)
        {
            try
            {
                if (id != cart.CartId)
                {
                    return BadRequest($"Customer with Id={id} not found");
                }
                var updateCart = await _cartRepo.GetCartByCartId(id);
                if (updateCart == null)
                {
                    return NotFound($"Cart with Id={id} not found");
                }
                return await _cartRepo.UpdateCart(cart);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating record");
            }
        }

        // POST: api/Carts
        [HttpPost]
        public async Task<IActionResult> PostCart([FromBody] Cart cart)
        {
            try
            {
                if (cart == null)
                {
                    return BadRequest();
                }
                var result = await _cartRepo.AddCart(cart);

                return CreatedAtAction(nameof(GetCart), new { id = result.CartId }, result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new Customer record");
            }
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cart>> DeleteCart([FromRoute] int id)
        {
            try
            {
                var cartToDelete = await _cartRepo.GetCartByCartId(id);
                if (cartToDelete == null)
                {
                    return NotFound($"Customer with CustomerId={id} not found in the records");

                }
                return await _cartRepo.DeleteCart(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleteing record");
            }
        }
    }
}