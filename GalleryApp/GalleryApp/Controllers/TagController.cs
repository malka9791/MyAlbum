using AutoMapper;
using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using Gallery.SERVICE;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;
        private readonly IMapper _mapper;

        public TagController(ITagService tagService, IMapper mapper)
        {
            _tagService = tagService;
            _mapper = mapper;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var list = await _tagService.GetAllAsync();
            var listDto = _mapper.Map<IEnumerable<TagDto>>(list);
            return Ok(listDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var tag = await _tagService.GetByIdAsync(id);
            var tagDto = _mapper.Map<TagDto>(tag);
            return Ok(tagDto);
        }
        [HttpPost]
        public async Task Post([FromBody] TagPostDto tag)
        {
            var dto = _mapper.Map<Tag>(tag);
            await _tagService.AddValueAsync(dto);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TagPostDto tag)
        {
            var existingTag = await _tagService.GetByIdAsync(id);



            if (existingTag != null)
            {
                // אם התג קיים, עדכון פשוט
                existingTag.Name = tag.Name;
                await _tagService.UpdateValueAsync(existingTag);
                return Ok(existingTag);
            }
            else
            {
                return NoContent();  // 204 No Content
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
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
