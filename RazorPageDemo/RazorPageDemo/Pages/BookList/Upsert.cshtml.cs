using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RazorPageDemo.Models;
using System.Threading.Tasks;

namespace RazorPageDemo.Pages.BookList
{
    public class UpsertModel : PageModel
    {
		private readonly BookDbContext _context;
		public UpsertModel(BookDbContext context)
		{
			_context = context;
		}
		[BindProperty]
		public Book Book { get; set; }
		public async Task<IActionResult> OnGet(int? id)
		{
			Book = new Book();
			if (id == null)
			{
				//Create
				return Page();
			}
			//Update
			Book = await _context.Books.FirstOrDefaultAsync(b=>b.BookId==id);
			if (Book == null)
			{
				return NotFound();
			}
			return Page();
			
		}

		public async Task<IActionResult> OnPost()
		{
			if (ModelState.IsValid)
			{
				if (Book.BookId == 0)
				{
					_context.Books.Add(Book);
				}
				else
				{
					_context.Books.Update(Book);
				}

				
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
