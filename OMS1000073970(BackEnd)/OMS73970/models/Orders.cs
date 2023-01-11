using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.models
{
    public class Orders
    {
        [Key]
        public int OrderId { get; set; }
        [StringLength(20)]
        [Column(TypeName = ("varchar(20)"))]
        public string OrderStatus { get; set; }
        public int OrderQuantity { get; set; }
        public int OrderCost { get; set; }

        public DateTime? OrderDate { get; set; }

        public int? OrderTotal { get; set; }
        public ICollection<OrderItems> OrderItems { get; set; }
        
        [ForeignKey("CustId")] 
        public virtual int CustId { get; set; }
        public virtual Customer Customer { get; set; }
        
       
    }
}
