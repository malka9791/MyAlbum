using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : Controller
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<IEnumerable<Image>> GetAllAsync()
        {
            return await _imageService.GetAllAsync();
        }

        [HttpGet("{id")]
        public async Task<Image> GetByIdAsync(int id)
        {
            return await _imageService.GetByIdAsync(id);
        }
        [HttpPost]
        public async Task PostAsync([FromBody] Image image)
        {
            await _imageService.AddValueAsync(image);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id,[FromBody] Image image)
        {
            if (id != image.Id)
            {
                return BadRequest("The ID in the URL does not match the ID in the request body.");
            }

            var existingImage = await _imageService.GetByIdAsync(id);
            if (existingImage == null)
            {
                return NotFound();
            }
            await _imageService.UpdateValueAsync(image);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var image = await _imageService.GetByIdAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            await _imageService.DeleteValueAsync(image);
            return NoContent(); // 204 - הצלחה ללא תוכן
        }
        
       

       
        
       
    }
}
