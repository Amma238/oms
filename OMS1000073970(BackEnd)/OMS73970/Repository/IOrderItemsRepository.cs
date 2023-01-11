using OMS73970.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace OMS73970.Repository
{
    public interface IOrderItemsRepository
    {
        Task<IEnumerable<OrderItems>> GetOrderItems();
        Task<OrderItems> GetOrderItemByOrderItemId(int orderItemId);
        List<OrderItems> GetOrderItemsByOrderId(int orderId);
        Task<OrderItems> GetOrderItemByItemAndOrderItemId(int orderItemId, int itemId,int orderId);
        Task<OrderItems> UpdateOrderItems(OrderItems orditem);
        Task<OrderItems> DeleteOrderItems(int id);
        Task<OrderItems> AddOrderItems(OrderItems orditem);

    }
}
