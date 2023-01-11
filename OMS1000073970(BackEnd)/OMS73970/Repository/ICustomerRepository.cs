using OMS73970.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.repository
{
        public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetCustomers();
        Task<Customer> Login(int CustId, string CustPass);

        Task<Customer> Login(string data, string CustPass);

        Task<Customer> GetCustomerByCustEmail(string email);
        Task<Customer> GetCustomerByCustId(int CustId);
        
        Task<Customer> AddCustomer(Customer Customer);

        Task<Customer> UpdateCustomer( Customer customer);

        Task<Customer> UpdateCustomerByEmail(Customer customer);
        Task<Customer> DeleteCustomer(int id);

    }
}
