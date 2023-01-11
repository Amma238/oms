using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.models
{
    public class OrderItems
    { 
        [Key]
        public int OrderItemId { get; set; }
        [ForeignKey("OrderId")]
        public virtual int OrderId { get; set; }
        public virtual Orders Orders { get; set; }


        [ForeignKey("ItemId")]
        public virtual int ItemId { get; set; }
       
        public virtual Items Items { get; set; }
       
        public int Discount { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
        public int TotalPrice { get; set; }
        [StringLength(10)]
        [Column(TypeName ="varchar(10)")]
        public string OrderStatus { get; set; }
        
        

    }
}
