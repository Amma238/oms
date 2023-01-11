using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RazorPageDemo.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RazorPageDemo.Pages.BookList
{
    public class IndexModel : PageModel
    {
        private readonly BookDbContext _context;
        public IndexModel(BookDbContext context)
        {
            _context = context;
        }
         
        public IEnumerable<Book> Books { get; set; }
        
        public async Task OnGet()
        {
            Books = await _context.Books.ToListAsync();
        }
		

		public async Task<IActionResult> OnPostDelete(int id)
        {

            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();  
            }
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return RedirectToPage("Index");
        }
    }
}
