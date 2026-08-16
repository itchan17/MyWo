using Microsoft.AspNetCore.Mvc;
using MyWoServer.Dtos.AreaDtos;
using MyWoServer.Services.AreaServices;

namespace MyWoServer.Controllers;

[ApiController]
[Route("api/[controller]")]
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

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AreaDto>> GetById(Guid id)
    {
        try
        {
            var area = await _areaService.GetById(id);
            return Ok(area);
        }
        catch (KeyNotFoundException ex)
        { 
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AreaDto>> Create([FromBody]CreateAreaDto area)
    {
        var result = await _areaService.Create(area);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<AreaDto>> Update(Guid id, [FromBody] CreateAreaDto area)
    {
        try
        {
            var result = await _areaService.Update(id, area);

            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
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
            return NotFound(ex.Message);
        }
    }
}
