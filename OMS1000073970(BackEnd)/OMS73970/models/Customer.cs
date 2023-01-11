using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OMS73970.models
{
    public class Customer
    {
        [Key]
        public int CustId { get; set; }
        [Column(TypeName = "varchar(10)")]
        [Required]
        [StringLength(10)]
        public string CustName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string CustEmail { get; set; }
        [Required]
        [Column(TypeName = "varchar(10)")]
        [StringLength(10)]
        public string CustPass { get; set; }
        [Required]
        [Column(TypeName = "varchar(10)")]
        [StringLength(10)]
        public string CustPhone { get; set; }
        [Column(TypeName = "varchar(10)")]
        [StringLength(10)]
        public string CustAltPhone { get; set; }
        [Required]
        [Column(TypeName = "varchar(10)")]
        [StringLength(10)]
        public string CustCity { get; set; }
        [Required]
        [Column(TypeName = "varchar(10)")]
        [StringLength(10)]

        public string CustState { get; set; }
        [Required]
        [Column(TypeName = "varchar(10)")]
        [StringLength(20)]
        public string CustAddress { get; set; }
        
        public decimal? CustBalance { get; set; }
       
    }
}
