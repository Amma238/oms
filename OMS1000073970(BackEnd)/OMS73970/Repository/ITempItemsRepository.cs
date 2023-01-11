using OMS73970.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.Repository
{
    public interface ITempItemsRepository
    {
        Task<IEnumerable<TempItems>> GetTempItems();
        Task<TempItems> GetTempItemsById(int TempItemId);
        List<TempItems> GetTempItemsByCustId(int custId);
        Task<TempItems> AddTempItems(TempItems tempItem);
        Task<TempItems> DeleteTempItems(int tempItemId);

    }
}
