using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace Gallery.API.Controllers
{

        [Route("api/[controller]")]
        [ApiController]
    public class EnhanceController : ControllerBase
    {
        private readonly IHuggingFaceService _huggingFaceService;

        public EnhanceController(IHuggingFaceService huggingFaceService)
        {
            _huggingFaceService = huggingFaceService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile image)
        {
            try
            {
                if (image == null || image.Length == 0)
                    return BadRequest("No image uploaded.");

                var inputFileName = $"input_{Guid.NewGuid()}.jpg";
                var inputFilePath = Path.Combine("wwwroot", "images", inputFileName);

                using (var stream = new FileStream(inputFilePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                var enhancedImageUrl = await _huggingFaceService.EnhanceImageAsync(inputFilePath);
                return Ok(new { url = enhancedImageUrl });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


    }


}
