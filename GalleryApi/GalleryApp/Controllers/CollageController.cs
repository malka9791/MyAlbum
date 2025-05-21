using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CollageController : ControllerBase
    {
        private readonly IReplicateService _replicate;

        public CollageController(IReplicateService replicate)
        {
            _replicate = replicate;
        }

        [HttpPost("ai")]
        public async Task<IActionResult> RunAI([FromBody] string imageUrl)
        {
            var result = await _replicate.GenerateImageAsync(imageUrl);
            return Ok(new { result });
        }
    }

}
