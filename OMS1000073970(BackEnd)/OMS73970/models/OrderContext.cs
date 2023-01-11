using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.models
{
    public class OrderContext:DbContext
    {
        
        public OrderContext(DbContextOptions<OrderContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Items> Items { get; set; }
        public DbSet<OrderItems> OrderItems{ get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<TempItems> TempItems { get; set; }

    }
}
