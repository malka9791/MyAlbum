using AutoMapper;
using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public ImageController(IImageService imageService,IMapper mapper)
        {
            _imageService = imageService;
            _mapper = mapper;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var list=await _imageService.GetAllAsync();
            var listDto=_mapper.Map<IEnumerable<ImageDto>> (list);
            return Ok(listDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {

            var image= await _imageService.GetByIdAsync(id);
            var imageDto=_mapper.Map<ImageDto> (image);
            return Ok(imageDto);
        }
        [HttpPost]
        public async Task Post([FromBody] ImagePostDto image)
        {
            var dto=_mapper.Map<Image>(image);
            await _imageService.AddValueAsync(dto);
        }
        [HttpPut("{id}")]
        public async Task Put(int id,[FromBody] ImagePostDto image)
        {
            
            var dto = _mapper.Map<Image>(image);
            await _imageService.UpdateValueAsync(dto);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
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
