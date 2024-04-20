// Controllers/LiquorController.cs
using Microsoft.AspNetCore.Mvc;
using SSLiquour.Context;
using SSLiquour.Interfaces;
using SSLiquour.Models;
using SSLiquour.Services;

[Route("api/[controller]")]
[ApiController]
public class LiquorController : ControllerBase
{
    private readonly ILiquorService _liquorService;

    public LiquorController(ILiquorService liquorService)
    {
        _liquorService = liquorService;
    }

    [HttpGet()]
    public ActionResult<List<Liquor>> GetAllLiquors()
    {
        return _liquorService.GetLiquorDetails();
    }

    [HttpPost()]
    public ActionResult<Liquor> CreateLiquor([FromBody] Liquor liquor)
    {
        return _liquorService.AddLiquor(liquor);
    }

    [HttpPut("{id}")]
    public ActionResult<Liquor> UpdateLiquor(int id, [FromBody] Liquor liquor)
    {
        liquor.Id = id;
        return _liquorService.UpdateLiquor(liquor);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteLiquor(int id)
    {
        if (_liquorService.DeleteLiquor(id))
            return Ok();
        else
            return NotFound();
    }

    [HttpGet("{id}")]
    public ActionResult<Liquor> GetLiquorById(int id)
    {
        var liquor = _liquorService.GetLiquor(id);
        if (liquor != null)
            return liquor;
        else
            return NotFound();
    }
}
