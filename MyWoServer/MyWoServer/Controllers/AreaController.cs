using Microsoft.AspNetCore.Mvc;
using MyWoServer.Dtos.AreaDtos;
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
    public async Task<ActionResult<IEnumerable<AreaDto>>> GetAll()
    {
        var result = await _areaService.GetAll();

        return Ok(new ApiResponse<IEnumerable<AreaDto>>(true, "Areas retrieved successfully", result));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AreaDto>> GetById(Guid id)
    {
        try
        {
            var area = await _areaService.GetById(id);

            return Ok(new ApiResponse<AreaDto>(true, "Area retrieved successfully", area));
        }
        catch (KeyNotFoundException ex)
        { 
            return NotFound(new ApiResponse<object>(false, ex.Message, null));
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AreaDto>> Create([FromBody]CreateAreaDto areaDto)
    {
        var area = await _areaService.Create(areaDto);

        return Ok(new ApiResponse<AreaDto>(true, "Area created successfully", area));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<AreaDto>> Update(Guid id, [FromBody] CreateAreaDto areaDto)
    {
        try
        {
            var updatedArea = await _areaService.Update(id, areaDto);

            return Ok(new ApiResponse<AreaDto>(true, "Area updated successfully", updatedArea));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new ApiResponse<object>(false, ex.Message, null));
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
            return NotFound(new ApiResponse<object>(false, ex.Message, null));
        }
    }
}
