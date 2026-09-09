using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Dtos.ProjectDtos;
using MyWoServer.Services.ProjectServices;
using MyWoServer.Shared;

namespace MyWoServer.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAll()
        {
            var projects = await _projectService.GetAll();
            return Ok(new ApiResponse<IEnumerable<ProjectDto>>(true, "Projects retrieved successfully", projects));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetById(Guid id)
        {
            try
            {
                var project = await _projectService.GetById(id);

                return Ok(
                    new ApiResponse<ProjectDto>(
                        true,
                        "Project retrieved successfully",
                        project
                    )
                );
            }
            catch (KeyNotFoundException ex)
            {
                return Problem(
                    statusCode: StatusCodes.Status404NotFound,
                    title: "Project Not Found",
                    detail: ex.Message
                );
            }
        }

        [HttpPost("/areas/{areaId}/projects")]
        public async Task<ActionResult<ProjectDto>> Create(Guid areaId, [FromBody]CreateProjectDto projectDto)
        {
            try
            {
                var project = await _projectService.Create(areaId, projectDto);

                return Ok(new ApiResponse<ProjectDto>(true, "Project created successfully", project));
            }
            catch (KeyNotFoundException ex)
            {
                return Problem(
                    statusCode: StatusCodes.Status404NotFound,
                    title: "Area Not Found",
                    detail: ex.Message
                );
            }
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> Update(Guid id, UpdateProjectDto updateDto)
        {
            try
            {
                var project = await _projectService.Update(id, updateDto);

                return Ok(new ApiResponse<ProjectDto>(true, "Project updated successfully", project));
            }
            catch (KeyNotFoundException ex)
            {
                return Problem(
                    statusCode: StatusCodes.Status404NotFound,
                    title: "Project Not Found",
                    detail: ex.Message
                );
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                await _projectService.Delete(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return Problem(
                    statusCode: StatusCodes.Status404NotFound,
                    title: "Project Not Found",
                    detail: ex.Message
                );
            }
        }
    }
}
