using Gallery.CORE.Models;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly IAiService _aiService;

    public AiController(IAiService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("analyze-description")]
    public async Task<IActionResult> AnalyzeDescription([FromBody] AnalyzeDescriptionRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Description))
            return BadRequest("Description is required.");

        try
        {
            var result = await _aiService.AnalyzeImageDescriptionAsync(request.Description);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }
}
