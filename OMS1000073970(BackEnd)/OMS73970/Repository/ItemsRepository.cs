using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OMS73970.models;

namespace OMS73970.Repository
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly OrderContext _context;
        public ItemsRepository(OrderContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Items>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }
        public async Task<Items> GetItemByItemId(int ItemId)
        {
            return await _context.Items
                   .FirstOrDefaultAsync(e => e.ItemId == ItemId);
        }
        public  async Task<Items> AddItem(Items item)
        {
            var result = await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Items> DeleteItem(int id)
        {
            var result = await _context.Items.FirstOrDefaultAsync(i => i.ItemId == id);
            if (result != null)
            {
                _context.Items.Remove(result);
                await _context.SaveChangesAsync();
                return result;
               
            }
            return null;
        }

       


        public async Task<Items> UpdateItem(Items item)
        {
            var result = await _context.Items.FirstOrDefaultAsync(e => e.ItemId ==item.ItemId);
            if (result != null)
            {
                result.ItemCategory = item.ItemCategory;
                result.ItemCost=item.ItemCost;
                result.ItemDiscount=result.ItemDiscount;
                result.ItemQuantity = item.ItemQuantity;
                result.ItemUrl = item.ItemUrl;
                result.ItemName = item.ItemName;
               
                
               
                _context.Entry(result).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public List<Items> GetItemsByItemCategory(string itemCategory)
        {
            List<Items> items = new List<Items>();
            foreach(var item in _context.Items)
            {
                if (item.ItemCategory == itemCategory)
                {
                    items.Add(item);
                }
            }
            return items;
        }
    }
    }

