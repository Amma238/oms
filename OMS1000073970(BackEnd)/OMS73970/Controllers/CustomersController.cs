using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMS73970.models;
using OMS73970.repository;
using OMS73970.Repository;

namespace OMS73970.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepo;
 
        public CustomersController(ICustomerRepository customerRepo)
        {
            _customerRepo = customerRepo;
    
        }
        [HttpGet("login/{id}/{pass}")]
        public async Task<ActionResult<Customer>> LoginCustomer(int id,string pass)
        {
            try
            {
                return Ok(await _customerRepo.Login(id,pass));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }

        }
        [HttpGet("login/{data}/{pass}")]
        public async Task<ActionResult<Customer>> LoginCustomer(string data, string pass)
        {
            try
            {
                return Ok(await _customerRepo.Login(data, pass));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }

        }
        

        // GET: api/Customers
        [HttpGet]
        public  async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            try
            {
                
                return Ok(await  _customerRepo.GetCustomers());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }
            
        }

 

        // GET: api/Customers/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Customer>> GetCustomer([FromRoute] int id)
        {
            try
            {
                var result = await _customerRepo.GetCustomerByCustId(id);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<Customer>> GetCustomer([FromRoute] string email)
        {
            try
            {
                var result = await _customerRepo.GetCustomerByCustEmail(email);
                if (result == null) return NotFound();
                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievind data from database");
            }
        }
        

        // POST: api/Customers
        [HttpPost("add")]
        public async Task<ActionResult<Customer>> PostCustomer([FromBody] Customer customer)
        {
            try
            {
                if (customer == null)
                {
                    return BadRequest();
                }
                var result= await _customerRepo.AddCustomer(customer);

                return CreatedAtAction(nameof(GetCustomer), new { id = result.CustId }, result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating new Customer record");
            }
        }

        // DELETE: api/Customers/5
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer([FromRoute] int id)
        {
            try
            {
                var customerToDelete = await _customerRepo.GetCustomerByCustId(id);
                if (customerToDelete == null)
                {
                    return NotFound($"Customer with CustomerId={id} not found in the records");
                
                }
                return await _customerRepo.DeleteCustomer(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleteing record");
            }
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<Customer>> PutCustomer(int id,Customer customer)
        {
            try
            {
                if (id != customer.CustId)
                {
                    return BadRequest($"Customer with Id={id} not found");
                }
                var updateCustomer = await _customerRepo.GetCustomerByCustId(id);
                if (updateCustomer == null)
                {
                    return NotFound($"Employee with Id={id} not found");
                }
                return await _customerRepo.UpdateCustomer(customer);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating record");
            }
        }

        [HttpPut("updateemail/{email}")]
        public async Task<ActionResult<Customer>> PutCustomerByEmail(string email, Customer customer)
        {
            try
            {
                if (email != customer.CustEmail)
                {
                    return BadRequest($"Customer with Email={email} not found");
                }
                var updateCustomer = await _customerRepo.GetCustomerByCustEmail(email);
                if (updateCustomer == null)
                {
                    return NotFound($"Employee with Id={email} not found");
                }
                return await _customerRepo.UpdateCustomerByEmail(customer);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating record");
            }
        }
    }
}