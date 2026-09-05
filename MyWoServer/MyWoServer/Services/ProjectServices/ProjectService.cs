using Microsoft.EntityFrameworkCore;
using MyWoServer.Data;
using MyWoServer.Dtos.ProjectDtos;
using MyWoServer.Mappers;
using MyWoServer.Models;

namespace MyWoServer.Services.ProjectServices;

public class ProjectService : IProjectService
{
    private readonly AppDbContext _appDbContext;

    public ProjectService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<ProjectDto>> GetAll()
    {
        return await _appDbContext.Projects
            .Select(project => project.ToProjectDto())
            .ToListAsync();
    }


    public async Task<ProjectDto> GetById(Guid id)
    {
        var project = await _appDbContext.Projects.FindAsync(id);

        if(project is null)
            throw new KeyNotFoundException($"Project with ID {id} was not found.");

        return project.ToProjectDto();
    }


    public async Task<ProjectDto> Create(CreateProjectDto createDto)
    {
        var areaExist = await _appDbContext.Areas.AnyAsync(a => a.Id == createDto.AreaId);

        if (!areaExist)
            throw new KeyNotFoundException($"Area with ID '{createDto.AreaId}' was not found.");

        var project = createDto.ToProject();

        _appDbContext.Projects.Add(project);
        
        await _appDbContext.SaveChangesAsync();

        return project.ToProjectDto();
    }

    public async Task<ProjectDto> Update(Guid id, UpdateProjectDto updateDto)
    {
        var project = await _appDbContext.Projects.FindAsync(id);

        if(project is null)
            throw new KeyNotFoundException($"Project with ID {id} was not found.");

        project.Name = updateDto.Name;
        project.Description = updateDto.Description;
        project.Status = updateDto.Status;
        project.StartDate = updateDto.StartDate;
        project.DueDate = updateDto.StartDate;
        project.SetUpdatedAt();

        await _appDbContext.SaveChangesAsync();

        return project.ToProjectDto();
    }

    public async Task Delete(Guid id)
    {
        var project = await _appDbContext.Projects.FindAsync(id);

        if (project is null)
            throw new KeyNotFoundException($"Project with ID {id} was not found.");

        _appDbContext.Projects.Remove(project);
        await _appDbContext.SaveChangesAsync();
    }
}
