using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OMS73970.models;

namespace OMS73970.Repository
{
    public class OrderItemsRepository : IOrderItemsRepository
    {
        private readonly OrderContext _context;

        public OrderItemsRepository(OrderContext context)
        {
            this._context = context;

        }
        public async Task<OrderItems> AddOrderItems(OrderItems orditem)
        {
            var result = await _context.OrderItems.AddAsync(orditem);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<OrderItems> DeleteOrderItems(int id)
        {
            var result = await _context.OrderItems.FirstOrDefaultAsync(c => c.OrderItemId == id);
            if (result != null)
            {
                _context.OrderItems.Remove(result);
                await _context.SaveChangesAsync();
            }
            return null;
        }

        public async Task<OrderItems> GetOrderItemByItemAndOrderItemId(int orderItemId, int itemId,int orderId)
        {
            return await _context.OrderItems.FirstOrDefaultAsync(c => c.OrderItemId == orderItemId && c.ItemId == itemId && c.OrderId==orderId);
        }

        public async Task<OrderItems> GetOrderItemByOrderItemId(int orderItemId)
        {
            return await _context.OrderItems.FirstOrDefaultAsync(o => o.OrderItemId == orderItemId);
        }
    

        public async  Task<IEnumerable<OrderItems>> GetOrderItems()
        {
            return await _context.OrderItems.ToListAsync();

        }

        public List<OrderItems> GetOrderItemsByOrderId(int orderId)
        {
            List<OrderItems> orderItems = new List<OrderItems>();
            foreach(var item in _context.OrderItems)
            {
                if (item.OrderId == orderId)
                {
                    orderItems.Add(item);
                }
            }
            return orderItems;

        }

        public async Task<OrderItems> UpdateOrderItems(OrderItems orditem)
        {
            var result = await _context.OrderItems.FirstOrDefaultAsync(ord => ord.OrderItemId == orditem.OrderItemId);
            if (result != null)
            {
                result.Discount = orditem.Discount;
                result.ItemId = orditem.ItemId;
                
                result.Quantity = orditem.Quantity;
                result.Items = orditem.Items;
                
                result.UnitPrice = orditem.UnitPrice;
                result.TotalPrice = orditem.TotalPrice;
                result.OrderStatus = orditem.OrderStatus;
                _context.Entry(result).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

      

        
    }
}
