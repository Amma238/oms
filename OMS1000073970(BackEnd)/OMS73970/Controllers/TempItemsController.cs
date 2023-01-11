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
    public class TempItemsController : ControllerBase
    {
        private readonly ITempItemsRepository _temprepo;

        public TempItemsController(ITempItemsRepository temprepo)
        {
            _temprepo=temprepo;
        }

        // GET: api/TempItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TempItems>>> GetTempItems()
        {
            try
            {
                return Ok(await _temprepo.GetTempItems());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Records in the database");
            }
        }

        // GET: api/TempItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TempItems>> GetTempItems([FromRoute] int id)
        {
            try
            {
                var result = await _temprepo.GetTempItemsById(id);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Records in the database");
            }
        }

        [HttpGet("customer/{custId}")]
        public  ActionResult<IEnumerable<TempItems>> GetTempItemByCustomerId([FromRoute] int custId)
        {
            try
            {
                List<TempItems> result =  _temprepo.GetTempItemsByCustId(custId);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No Records in the database");
            }
        }


        // POST: api/TempItems
        [HttpPost]
        public async Task<ActionResult<TempItems>> PostTempItems([FromBody] TempItems tempItems)
        {
            try
            {
                if (tempItems == null)
                {
                    return BadRequest();
                }
                var result = await _temprepo.AddTempItems(tempItems);
                return CreatedAtAction(nameof(GetTempItems), new { id = tempItems.TempItemId }, tempItems);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Attempt failed to add item into Item");
            }
        }

        // DELETE: api/TempItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TempItems>> DeleteTempItems([FromRoute] int id)
        {
            try
            {
                var result = await _temprepo.GetTempItemsById(id);
                if (result == null)
                {
                    return BadRequest($"Failed to delete the item with Id={id} ");
                }
                return await _temprepo.DeleteTempItems(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleteing the item from the database");
            }
        }
    }
}