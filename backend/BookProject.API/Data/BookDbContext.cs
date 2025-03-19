using Microsoft.EntityFrameworkCore;

namespace BookProject.API.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) { }

        public DbSet<Project> Books { get; set; }
    }
}