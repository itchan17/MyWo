using Microsoft.EntityFrameworkCore;
using MyWoServer.Data;
using MyWoServer.Dtos;
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

    public async Task<PagedResult<AreaResponseDto>> GetAll(PaginationParams pagination, bool includeProjects = false)
    {
        var query = _appDbContext.Areas
               .OrderByDescending(area => area.CreatedAt)
               .AsQueryable();

        if (includeProjects)
        {
            query = query.Include(area => area.Projects);
        }

        if (pagination.IsPaginated)
        {
            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pagination.PageNumber.Value - 1) * pagination.PageSize.Value)
                .Take(pagination.PageSize.Value)
                .Select(area => area.ToAreaResponseDto(includeProjects))
                .ToListAsync();

            return new PagedResult<AreaResponseDto>
            {
                Items = items,
                PageNumber = pagination.PageNumber.Value,
                PageSize = pagination.PageSize.Value,
                TotalCount = totalCount
            };
        }
        else
        { 
            return new PagedResult<AreaResponseDto>
            {
                Items = await query.Select(area => area.ToAreaResponseDto(includeProjects)).ToListAsync(),
                PageNumber = 1,
                PageSize = await query.CountAsync(),
                TotalCount = await query.CountAsync()
            };
        }
        
       
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
