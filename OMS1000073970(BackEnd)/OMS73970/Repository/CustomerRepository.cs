using Microsoft.EntityFrameworkCore;
using OMS73970.models;
using OMS73970.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OMS73970.Repository
{
    public class CustomerRepository : ICustomerRepository

    {
        private readonly OrderContext _context;
       
        public CustomerRepository(OrderContext context)
        {
            this._context = context;
            
        }
        

        public  async Task<IEnumerable<Customer>> GetCustomers()
        {

            return await _context.Customers.ToListAsync();
        }
        public async Task<Customer> GetCustomerByCustId(int CustId)
        {
            return await _context.Customers
                   .FirstOrDefaultAsync(e => e.CustId == CustId);
        }

        public async Task<Customer> GetCustomerByCustEmail(string custEmail)
        {
            return await _context.Customers
                   .FirstOrDefaultAsync(e => e.CustEmail == custEmail);
        }
        public async Task<Customer> AddCustomer(Customer Customer)
        {
            var result = await _context.Customers.AddAsync(Customer);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

       public async Task<Customer> DeleteCustomer(int id)
        {
            var result = await _context.Customers.FirstOrDefaultAsync(c => c.CustId == id);
            if (result != null)
            {
                _context.Customers.Remove(result);
                await _context.SaveChangesAsync();
            }
            return null;
        }

        public async Task<Customer> UpdateCustomer( Customer customer)
        {
            var result = await _context.Customers.FirstOrDefaultAsync(e => e.CustId == customer.CustId);
            if (result != null)
            {
                result.CustName = customer.CustName;
                result.CustPass = customer.CustPass;
                result.CustEmail = customer.CustEmail;
                result.CustPhone = customer.CustPhone;
                result.CustAltPhone = customer.CustAltPhone;
                result.CustCity = customer.CustCity;
                result.CustState = customer.CustState;
                result.CustBalance = customer.CustBalance;
                result.CustAddress = customer.CustAddress;
                _context.Entry(result).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }


        public async Task<Customer> UpdateCustomerByEmail(Customer customer)
        {
            var result = await _context.Customers.FirstOrDefaultAsync(e => e.CustEmail == customer.CustEmail);
            if (result != null)
            {
                result.CustId = customer.CustId;
                result.CustName = customer.CustName;
                result.CustPass = customer.CustPass;
                result.CustEmail = customer.CustEmail;
                result.CustPhone = customer.CustPhone;
                result.CustAltPhone = customer.CustAltPhone;
                result.CustCity = customer.CustCity;
                result.CustState = customer.CustState;
                result.CustBalance = customer.CustBalance;
                result.CustAddress = customer.CustAddress;
                _context.Entry(result).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public async Task<Customer> Login(int CustId, string CustPass)
        {
            var result = await _context.Customers.FirstOrDefaultAsync(c => c.CustId == CustId && c.CustPass == CustPass );
            return result;
        }

        public async Task<Customer> Login(string data, string CustPass)
        {
            var result = await _context.Customers.FirstOrDefaultAsync(c => (c.CustEmail == data|| c.CustPhone==data) && c.CustPass == CustPass);
            return result;
        }

        
    }
}

