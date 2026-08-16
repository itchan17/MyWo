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

        public static AreaDto ToAreaDto(this Area area)
        {
            return new AreaDto
            {
                Id = area.Id,
                Name = area.Name,
                Description = area.Description,
                Icon = area.Icon,
                Color = area.Color,
                CreatedAt = area.CreatedAt,
                UpdatedAt = area.UpdatedAt
            };
        }
    }
}
