using Microsoft.EntityFrameworkCore;
using SSLiquour.Models;

namespace SSLiquour.Context
{
    public class JwtContext: DbContext
    {
        public JwtContext(DbContextOptions<JwtContext> options): base(options)
        {
        
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Liquor> Liquors { get; set; }
    }
}
