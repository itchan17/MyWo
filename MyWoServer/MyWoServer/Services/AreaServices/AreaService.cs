using Microsoft.EntityFrameworkCore;
using MyWoServer.Data;
using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Models;

namespace MyWoServer.Services.AreaServices;

public class AreaService : IAreaService
{
    private readonly AppDbContext _appDbContext;

    public AreaService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<AreaDto>> GetAll()
    {
        return await _appDbContext.Areas
            .Select(area => new AreaDto
            {
                Id = area.Id,
                Name = area.Name,
                Description = area.Description,
                Icon = area.Icon,
                Color = area.Color,
                CreatedAt = area.CreatedAt,
                UpdatedAt = area.UpdatedAt
            })
            .ToListAsync();
    }

    public async Task<AreaDto> GetById(Guid id)
    {
        var area = await _appDbContext.Areas.FirstOrDefaultAsync(x => x.Id == id);

        if(area is null)
            throw new KeyNotFoundException("Area was not found");

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

    public async Task<AreaDto> Create(CreateAreaDto areaDto)
    {
        var area = new Area
        {
            Name = areaDto.Name,
            Description = areaDto.Description,
            Icon = areaDto.Icon,
            Color = areaDto.Color,
            CreatedBy = _appDbContext.Users.FirstOrDefault().Id,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _appDbContext.Areas.Add(area);
        _appDbContext.SaveChanges();

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

    public async Task<AreaDto> Update(Guid id, CreateAreaDto areaDto)
    {
        var area = await _appDbContext.Areas.FirstOrDefaultAsync(x => x.Id == id);

        if (area == null)
            throw new KeyNotFoundException("Area was not found");

        area.Name = areaDto.Name;
        area.Description = areaDto.Description;
        area.Icon = areaDto.Icon;
        area.Color = areaDto.Color;
        area.SetUpdatedAt();

        await _appDbContext.SaveChangesAsync();

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
