using OMS73970.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.Repository
{
    public interface ICartRepository
    {

        Task<IEnumerable<Cart>> GetAllCartItems();
        Task<Cart> GetCartByCartId(int CartId);
        List<Cart> GetCartByCustomerId(int CustId);
        List<Cart> GetCartItemsByCartId(int cartId);
        Task<Cart> AddCart(Cart cart);
        Task<Cart> DeleteCart(int CartId);
        Task<Cart> UpdateCart(Cart cart);
    }
}
