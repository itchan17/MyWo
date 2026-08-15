using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Models;

namespace MyWoServer.Services.AreaServices;

public interface IAreaService
{
    Task<IEnumerable<AreaDto>> GetAll();
    Task<AreaDto> GetById(Guid id);
    Task<AreaDto> Create(CreateAreaDto area);
    Task<AreaDto> Update(Guid id, CreateAreaDto area);

}
