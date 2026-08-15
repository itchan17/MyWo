using Microsoft.EntityFrameworkCore;
using MyWoServer.Models;

namespace MyWoServer.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<User> Users { get; set; }
    public DbSet<Area> Areas { get; set; }
}
