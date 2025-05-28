using AutoMapper;
using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public ImageController(IImageService imageService,IMapper mapper)
        {
            _imageService = imageService;
            _mapper = mapper;
        }
        [Authorize(Roles="admin")]
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
        [HttpGet("album/{albumId}")]
        public async Task<ActionResult> GetImagesByAlbumId(int albumId)
        {
            var list = await _imageService.GetImagesByAlbumIdAsync(albumId);
            var listDto = _mapper.Map<IEnumerable<ImageDto>>(list);
            return Ok(listDto);
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult> GetImagesByUserId(int userId)
        {
            var list = await _imageService.GetImagesByUserIdAsync(userId);
            var listDto = _mapper.Map<IEnumerable<ImageDto>>(list);
            return Ok(listDto);
        }
        [HttpPost]
        public async Task Post([FromBody] ImagePostDto image)
        {
            var dto=_mapper.Map<Image>(image);
            await _imageService.AddValueAsync(dto);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,[FromBody] ImageUpdateDto image)
        {
            var existingImage = await _imageService.GetByIdAsync(id);

            if (existingImage != null)
            {
                // אם התג קיים, עדכון פשוט
                existingImage.ImgType = existingImage.ImgType;
                existingImage.AlbumId = existingImage.AlbumId;
                existingImage.ImgUrl = existingImage.ImgUrl;
                existingImage.User.Id = existingImage.UserId;
                existingImage.Name= image.Name;
                existingImage.Description= image.Description;
                existingImage.UpdateAt= DateTime.UtcNow;
                await _imageService.UpdateValueAsync(existingImage);  
                return Ok(existingImage);
            } 
            return NoContent();  // 204 No Content

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
