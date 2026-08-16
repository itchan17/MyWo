using MyWoServer.Enums;
using MyWoServer.Models.Interfaces;

namespace MyWoServer.Models
{
    public class Project : BaseModel, ISoftDeletable
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public ProjectStatusEnum Status { get; set; } = ProjectStatusEnum.Active;
        public DateTime? StartDate { get; set; }
        public DateTime? DueDate { get; set; }
        public Guid AreaId { get; set; }
        public Area Area { get; set; } = null!;
        public DateTime? DeletedAt { get; set; }
    }
}
