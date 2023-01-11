using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorPageDemo.Models;
using System.Threading.Tasks;

namespace RazorPageDemo.Pages.BookList
{
    public class CreateModel : PageModel
    {

        private readonly BookDbContext _context;
        public CreateModel(BookDbContext context)
        {
            _context = context;  
        }
        [BindProperty]
        //On post method this value will be send as property
        public Book Book { get; set; }
        public void OnGet()
        {

        }
        public async Task<IActionResult> OnPost()
        {
            if (ModelState.IsValid)
            {
                await _context.Books.AddAsync(Book);
                await _context.SaveChangesAsync();
                return RedirectToPage("Index");
            }
            else
            {
                return Page();
            }
        }
    }
}
