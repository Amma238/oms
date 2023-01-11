using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace RazorPageDemo.Models
{
    public class BookDbContext:DbContext
    {

        public BookDbContext(DbContextOptions<BookDbContext> options):base(options)
        {
        }

        public DbSet<Book> Books { get; set;}

		internal Task<Book> FirstOrDefaultAsync(int? id)
		{
			throw new NotImplementedException();
		}
	}
}
