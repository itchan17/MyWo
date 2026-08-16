using MyWoServer.Models.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyWoServer.Models;

public class Area : BaseModel, ISoftDeletable
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Icon { get; set; }
    public string? Color { get; set; }

    public string CreatedBy { get; set; } = string.Empty;
    [ForeignKey(nameof(CreatedBy))]
    public User CreatedByUser { get; set; } = null!;
    public DateTime? DeletedAt { get; set; }
}
