using MyWoServer.Dtos;
using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Models;

namespace MyWoServer.Services.AreaServices;

public interface IAreaService
{
    Task<PagedResult<AreaResponseDto>> GetAll(PaginationParams pagination, bool includeProjects);
    Task<AreaResponseDto> GetById(Guid id);
    Task<AreaResponseDto> Create(CreateAreaDto area);
    Task<AreaResponseDto> Update(Guid id, CreateAreaDto area);
    Task Delete(Guid id);
}
