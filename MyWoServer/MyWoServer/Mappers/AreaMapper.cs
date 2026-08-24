using MyWoServer.Data;
using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Models;

namespace MyWoServer.Mappers
{
    public static class AreaMapper
    {
        // Pass the context temporarily
        public static Area ToEntity(this CreateAreaDto areaDto, AppDbContext _appDbContext)
        {
            return new Area
            {
                Name = areaDto.Name,
                Description = areaDto.Description,
                Icon = areaDto.Icon,
                Color = areaDto.Color,
                CreatedBy = _appDbContext.Users.FirstOrDefault().Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        public static AreaResponseDto ToAreaResponseDto(this Area area, bool includeProjects = false)
        {
            return new AreaResponseDto
            {
                Id = area.Id,
                Name = area.Name,
                Description = area.Description,
                Icon = area.Icon,
                Color = area.Color,
                Projects = includeProjects ? area.Projects.Select(project => project.ToProjectDto()).ToList() : [],
                CreatedAt = area.CreatedAt,
                UpdatedAt = area.UpdatedAt
            };
        }
    }
}
