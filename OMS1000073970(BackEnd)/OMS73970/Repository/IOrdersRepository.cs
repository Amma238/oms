using OMS73970.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.Repository
{
    public interface IOrdersRepository
    {
        Task<IEnumerable<Orders>> GetOrders();
        List<Orders> GetOrdersByCustId(int CustId);

        Task<Orders> GetOrderByOrderId(int OrderId);
        Task<Orders> UpdateOrder(Orders order);
        Task<Orders> AddOrder(Orders order);
        Task<Orders> DeleteOrder(int id);
        


    }
}
