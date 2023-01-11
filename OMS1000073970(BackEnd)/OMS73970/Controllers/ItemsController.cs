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
    public class ItemsController : ControllerBase
    {
        
        private readonly IItemsRepository _itemrepo;

        public ItemsController(IItemsRepository itemrepo)
        {
            _itemrepo = itemrepo;
            
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Items>>> GetItems()
        {
            try
            {
                return Ok(await _itemrepo.GetItems());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }
        }
        

    // GET: api/Items/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Items>> GetItem([FromRoute] int id)
    {
        try
        {
            var result = await _itemrepo.GetItemByItemId(id);
            if (result == null) return NotFound();
            return result;
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
        }
    }

        [HttpGet("category/{itemCategory}")]
        public ActionResult<IEnumerable<Items>> GetItemByItemCategory([FromRoute] string itemCategory)
        {
            try
            {
                var result =  _itemrepo.GetItemsByItemCategory(itemCategory);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }
        }

        

        // PUT: api/Items/5
        [HttpPut("update/{id}")]
     public async Task<ActionResult<Items>> PutItems([FromRoute] int id, [FromBody] Items items)
     {
            try
            {
                if (id != items.ItemId)
                {
                    return BadRequest($"Customer with Id={id} not found");
                }
                var updateItem = await _itemrepo.GetItemByItemId(id);
                if (updateItem == null)
                {
                    return NotFound($"Employee with Id={id} not found");
                }
                return await _itemrepo.UpdateItem(items);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating record");
            }
        }

     // POST: api/Items
     [HttpPost("add")]
     public async Task<ActionResult<Items>> PostItems([FromBody] Items items)
     {
            try
            {
                if (items == null)
                {
                    return BadRequest();
                }
                var result = await _itemrepo.AddItem(items);
                return CreatedAtAction(nameof(GetItem), new { id = items.ItemId }, items);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Attempt failed to add item into Item");
            }
         


        
     }

     // DELETE: api/Items/5
     [HttpDelete("delete/{id}")]
     public async Task<ActionResult<Items>> DeleteItems([FromRoute] int id)
     {
            try
            {
                var result = await _itemrepo.GetItemByItemId(id);
                if (result == null)
                {
                    return BadRequest($"Failed to delete the item with Id={id} ");
                }
                return await _itemrepo.DeleteItem(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleteing the item from the database");
            }

        
     }

    
}
}