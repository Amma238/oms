using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorPageDemo.Models;
using System.Threading.Tasks;

namespace RazorPageDemo.Pages.BookList
{
    public class EditModel : PageModel
    {
        private readonly BookDbContext _context;
        public EditModel(BookDbContext context)
        {
            _context = context;    
        }
        [BindProperty]
        public Book Book { get; set; }
        public async Task OnGet(int id)
        {
            Book = await _context.Books.FindAsync(id);
        }

        public async Task<IActionResult> OnPost()
        {
            if (ModelState.IsValid)
            {
                var BookFromDb = await _context.Books.FindAsync(Book.BookId);
               // BookFromDb.BookId=Book.BookId;
                BookFromDb.BookName= Book.BookName;
                BookFromDb.Author=Book.Author;
                BookFromDb.ISBN=Book.ISBN;
                await _context.SaveChangesAsync();
                return RedirectToPage("Index");
            }
            else
            {
                return RedirectToPage();
            }
        }
    }
}
