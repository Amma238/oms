//Enter prop and click the tab space twice you will get the required property syntax.

using System.ComponentModel.DataAnnotations;

namespace RazorPageDemo.Models
{
    public class Book
    {
        [Key]
        public int BookId { get; set; }
        [Required]
        public string BookName { get; set; }
        [Required]
        public string Author { get; set; }
        public string ISBN { get; set; }
    }
}
