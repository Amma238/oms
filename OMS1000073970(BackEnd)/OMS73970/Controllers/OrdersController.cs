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
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository _ordrepo;

        public OrdersController(IOrdersRepository ordrepo)
        {
            _ordrepo=ordrepo;

        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult< IEnumerable<Orders>>> GetOrders()
        {
            try
            {
                return Ok(await _ordrepo.GetOrders());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Records in the database");
            }
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Orders>> GetOrder([FromRoute] int id)
        {
            try
            {
                var result = await _ordrepo.GetOrderByOrderId(id);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Records in the database");
            }

        }

        [HttpGet("customer/{CustId}")]
        public ActionResult<IEnumerable<Orders>> GetOrderByCustomerId([FromRoute] int CustId)
        {
            try
            {
                var result =  _ordrepo.GetOrdersByCustId(CustId);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Records in the database");
            }

        }

        // PUT: api/Orders/5
        [HttpPut("update/{id}")]
        public async Task<ActionResult<Orders>> PutOrders([FromRoute] int id, [FromBody] Orders orders)
        {
            try
            {
                if (id != orders.OrderId)
                {
                    return BadRequest($"Order with Id={id} not found");
                }
                var updateOrder = await _ordrepo.GetOrderByOrderId(id);
                if (updateOrder == null)
                {
                    return NotFound($"Order with Id={id} not found");
                }
                return await _ordrepo.UpdateOrder(orders);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating record");
            }
        }
    

        // POST: api/Orders
        [HttpPost("add")]
        public async Task<ActionResult<Orders>> PostOrders([FromBody] Orders orders)
        {
        try
        {
            if (orders == null)
            {
                return BadRequest();
            }
            var result = await _ordrepo.AddOrder(orders);

            return CreatedAtAction(nameof(GetOrder), new { id = result.OrderId }, result);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new Customer record");
        }
    }

        // DELETE: api/Orders/5
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Orders>> DeleteOrders([FromRoute] int id)
        {
            try
            {
                var customerToDelete = await _ordrepo.GetOrderByOrderId(id);
                if (customerToDelete == null)
                {
                    return NotFound($"Order with OrderId={id} not found in the records");

                }
                return await _ordrepo.DeleteOrder(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleteing record");
            }
        }
    }
}