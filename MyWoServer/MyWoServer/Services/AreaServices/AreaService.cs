using Microsoft.EntityFrameworkCore;
using MyWoServer.Data;
using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Mappers;
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
            .Select(area => area.ToAreaDto())
            .ToListAsync();
    }

    public async Task<AreaDto> GetById(Guid id)
    {
        var area = await _appDbContext.Areas.FirstOrDefaultAsync(x => x.Id == id);

        if(area is null)
            throw new KeyNotFoundException("Area was not found");

        return area.ToAreaDto();
    }

    public async Task<AreaDto> Create(CreateAreaDto areaDto)
    {
        var area = areaDto.ToEntity(_appDbContext);

        _appDbContext.Areas.Add(area);
        _appDbContext.SaveChanges();

        return area.ToAreaDto();

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

        return area.ToAreaDto();
    }

    public async Task Delete(Guid id)
    {
        var area = _appDbContext.Areas.FirstOrDefault(x => x.Id == id);

        if(area is null)
            throw new KeyNotFoundException("Area was not found");

         _appDbContext.Areas.Remove(area);

        await _appDbContext.SaveChangesAsync();
    }
}
