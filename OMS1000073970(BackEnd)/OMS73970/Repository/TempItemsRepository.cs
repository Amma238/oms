using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OMS73970.models;

namespace OMS73970.Repository
{
    public class TempItemsRepository : ITempItemsRepository
    {
        private readonly OrderContext _context;
        public TempItemsRepository(OrderContext context)
        {
            _context = context;
        }
        public async Task<TempItems> AddTempItems(TempItems tempItem)
        {
            var result = await _context.TempItems.AddAsync(tempItem);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async  Task<TempItems> DeleteTempItems(int tempItemId)
        {
            var result = await _context.TempItems.FirstOrDefaultAsync(t=>t.TempItemId == tempItemId);
            if (result != null)
            {
                _context.TempItems.Remove(result);
                await _context.SaveChangesAsync();
            }
            return null;
        }

        public async Task<IEnumerable<TempItems>> GetTempItems()
        {
            return await _context.TempItems.ToListAsync();
        }

        public  List<TempItems> GetTempItemsByCustId(int custId)
        {
            List<TempItems> list = new List<TempItems>();
            foreach(var item in _context.TempItems)
            {
                if (item.CustId == custId)
                {
                    list.Add(item);
                }
               
            }
            return list;     
        }

        public async Task<TempItems> GetTempItemsById(int TempItemId)
        {
            return await _context.TempItems
                   .FirstOrDefaultAsync(e => e.TempItemId == TempItemId);
        }
    }
}
