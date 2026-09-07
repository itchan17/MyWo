using Microsoft.AspNetCore.Mvc;
using MyWoServer.Dtos;
using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Models;
using MyWoServer.Services.AreaServices;
using MyWoServer.Shared;

namespace MyWoServer.Controllers;

[ApiController]
[Route("api/areas")]
public class AreaController : ControllerBase
{
    private readonly IAreaService _areaService;
    public AreaController(IAreaService areaService)
    {
        _areaService = areaService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<AreaResponseDto>>> GetAll([FromQuery] PaginationParams pagination, [FromQuery] bool includeProjects = false)
    {
        var result = await _areaService.GetAll(pagination, includeProjects);

        return Ok(new ApiResponse<PagedResult<AreaResponseDto>>(true, "Areas retrieved successfully", result));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AreaResponseDto>> GetById(Guid id)
    {
        try
        {
            var area = await _areaService.GetById(id);

            return Ok(new ApiResponse<AreaResponseDto>(true, "Area retrieved successfully", area));
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

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AreaResponseDto>> Create([FromBody]CreateAreaDto areaDto)
    {
        var area = await _areaService.Create(areaDto);

        var response = new ApiResponse<AreaResponseDto>(true, "Area created successfully", area);

        return CreatedAtAction(
            nameof(GetById),
            new { id = area.Id },
            response
        );
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<AreaResponseDto>> Update(Guid id, [FromBody] CreateAreaDto areaDto)
    {
        try
        {
            var updatedArea = await _areaService.Update(id, areaDto);

            return Ok(new ApiResponse<AreaResponseDto>(true, "Area updated successfully", updatedArea));
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

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        try
        {
            await _areaService.Delete(id);
            return NoContent();
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
}
