using MyWoServer.Dtos.ProjectDtos;

namespace MyWoServer.Services.ProjectServices
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAll();
        Task<ProjectDto> GetById(Guid id);
        Task<ProjectDto> Create(CreateProjectDto createDto);
        Task<ProjectDto> Update(Guid id, UpdateProjectDto updateDto);
        Task Delete(Guid id);
    }
}
