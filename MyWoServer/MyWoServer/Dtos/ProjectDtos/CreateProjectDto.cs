using MyWoServer.Enums;
using System.ComponentModel.DataAnnotations;

namespace MyWoServer.Dtos.ProjectDtos;

public class CreateProjectDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    [StringLength(500)]
    public string? Description { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? DueDate { get; set; }
    public Guid AreaId { get; set; }
}
