using MyWoServer.Dtos.ProjectDtos;

namespace MyWoServer.Dtos.AreaDtos
{
    public class AreaResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public List<ProjectDto> Projects { get; set; } = [];
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
