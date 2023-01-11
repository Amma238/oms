using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.models
{
    public class Items
    {
        [Key]
        public int ItemId { get; set; }
        [Column(TypeName = "varchar(20)")]
        [StringLength(20)]
        public string ItemCategory { get; set; }
        public int ItemQuantity { get; set; }
        public int ItemCost { get; set; }
        public int? ItemDiscount { get; set; }
        public string ItemUrl { get; set; }
        
        public string ItemName { get; set; }

    }
}
