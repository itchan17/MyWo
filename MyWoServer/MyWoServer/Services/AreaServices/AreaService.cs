using Microsoft.EntityFrameworkCore;
using MyWoServer.Data;
using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Mappers;

namespace MyWoServer.Services.AreaServices;

public class AreaService : IAreaService
{
    private readonly AppDbContext _appDbContext;

    public AreaService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<AreaResponseDto>> GetAll(bool includeProjects = false)
    {
        var query = _appDbContext.Areas
               .AsQueryable();

        if (includeProjects)
        {
            query = query.Include(area => area.Projects);
        }
      
        return await query
            .OrderByDescending(area => area.CreatedAt)
            .Select(area => area.ToAreaResponseDto(includeProjects))
            .ToListAsync();
    }

    public async Task<AreaResponseDto> GetById(Guid id)
    {
        var area = await _appDbContext.Areas.FirstOrDefaultAsync(x => x.Id == id);

        if(area is null)
            throw new KeyNotFoundException("Area was not found");

        return area.ToAreaResponseDto();
    }

    public async Task<AreaResponseDto> Create(CreateAreaDto areaDto)
    {
        var area = areaDto.ToEntity(_appDbContext);

        _appDbContext.Areas.Add(area);
        _appDbContext.SaveChanges();

        return area.ToAreaResponseDto();

    }

    public async Task<AreaResponseDto> Update(Guid id, CreateAreaDto areaDto)
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

        return area.ToAreaResponseDto();
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
