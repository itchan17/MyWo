using Microsoft.AspNetCore.Identity;

namespace MyWoServer.Models;

public class User : IdentityUser
{
    public ICollection<Area> Areas { get; set; } = new List<Area>();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
