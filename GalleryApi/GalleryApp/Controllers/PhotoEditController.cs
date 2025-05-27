using Gallery.CORE.Models;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly IImageEditService _imageEditService;

        public ImagesController(IImageEditService imageEditService)
        {
            _imageEditService = imageEditService;
        }

        [HttpPost("decorate")]
        public async Task<IActionResult> DecorateImage([FromBody] EditImageRequest request)
        {
            var resultUrl = await _imageEditService.AnalyzeAndDecorateImageAsync(request.ImageUrl, request.Description);
            return Ok(resultUrl);
        }

    }

}
