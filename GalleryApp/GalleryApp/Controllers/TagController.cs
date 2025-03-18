using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<IEnumerable<Tag>> GetAllAsync()
        {
            return await _tagService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<Tag> GetByIdAsync(int id)
        {
            return await _tagService.GetByIdAsync(id);
        }
        [HttpPost]
        public async Task PostAsync([FromBody] Tag tag)
        {
            await _tagService.AddValueAsync(tag);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id,[FromBody] Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest("The ID in the URL does not match the ID in the request body.");
            }

            var existingTag = await _tagService.GetByIdAsync(id);
            if (existingTag == null)
            {
                return NotFound();
            }
            await _tagService.UpdateValueAsync(tag);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var Tag = await _tagService.GetByIdAsync(id);
            if (Tag == null)
            {
                return NotFound();
            }

            await _tagService.DeleteValueAsync(Tag);
            return NoContent(); // 204 - הצלחה ללא תוכן
        }
        
       

       
        
       
    }
}
