using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.models
{
    public class TempItems
    {
        [Key]
        public int TempItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual int ItemId { get; set; }
        public virtual Items Items { get; set; }
        public string ItemCategory { get; set; }
       
        public int UnitPrice { get; set; }
        public int TotalPrice { get; set; }
        public string Discount { get; set; }
        [ForeignKey("CustId")]
        public virtual int CustId { get; set; }

        public virtual Customer Customer { get; set; }
    }
}
