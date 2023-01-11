using OMS73970.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.Repository
{
    public interface IItemsRepository
    {
        Task<IEnumerable<Items>> GetItems();
        Task<Items> GetItemByItemId(int id);
        Task<Items> AddItem(Items item);
        Task<Items> UpdateItem(Items item);
        Task<Items> DeleteItem(int id);
        List<Items> GetItemsByItemCategory(string itemCategory);
    }
}
