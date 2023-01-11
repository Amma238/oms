using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RazorPageDemo.Models;
using System.Linq;
using System.Threading.Tasks;

namespace RazorPageDemo.Controllers
{
	[Route("api/Book")]
	public class BookController : Controller
	{
		private readonly BookDbContext _context;
		public BookController(BookDbContext context)
		{
			_context = context;
		}
		[HttpGet]
		public IActionResult GetAll()
		{
			return Json(new {data=_context.Books.ToList()});
		}
		[HttpDelete]
		public async Task<IActionResult> Delete(int id)
		{
			var bookFromDb = await _context.Books.FirstOrDefaultAsync(b => b.BookId == id);
			if (bookFromDb == null)
			{
				return Json(new {success= false,message="Error while deleting...!"});
			}
			_context.Books.Remove(bookFromDb);
			await _context.SaveChangesAsync();
			return Json(new { success = true, message = "Successful deletion..." });
			
		}
	}
}
