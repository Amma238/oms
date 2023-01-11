using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.models
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }
        [ForeignKey("CustId")]
        public virtual int CustId { get; set; }
        public virtual Customer Customer { get; set; }
        [ForeignKey("ItemId")]
        public virtual int ItemId { get; set; }
        public virtual Items Items { get; set; }
        public int CartQuantity { get; set; }
        public int CartAmount { get; set; }
    }
}
