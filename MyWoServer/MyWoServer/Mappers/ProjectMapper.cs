using MyWoServer.Dtos.ProjectDtos;
using MyWoServer.Models;

namespace MyWoServer.Mappers;

public static class ProjectMapper
{
    public static Project ToProject(this CreateProjectDto createDto, Guid areaId)
    {
        return new Project
        {
            Name = createDto.Name,
            Description = createDto.Description,
            StartDate = createDto.StartDate,
            DueDate = createDto.DueDate,
            AreaId = areaId,
        };
    }

    public static ProjectDto ToProjectDto(this Project project)
    {

        return new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            Status = project.Status,
            StartDate = project.StartDate,
            DueDate = project.DueDate,
            DeletedAt = project.DeletedAt,
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt
        };
    }
}
