using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;

        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<IEnumerable<Album>> GetAllAsync()
        {
            return await _albumService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<Album> GetByIdAsync(int id)
        {
            return await _albumService.GetByIdAsync(id);
        }
        [HttpPost]
        public async Task PostAsync([FromBody] Album album)
        {
            await _albumService.AddValueAsync(album);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id,[FromBody] Album album)
        {
            if (id != album.Id)
            {
                return BadRequest("The ID in the URL does not match the ID in the request body.");
            }

            var existingAlbum = await _albumService.GetByIdAsync(id);
            if (existingAlbum == null)
            {
                return NotFound();
            }
            await _albumService.UpdateValueAsync(album);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var album = await _albumService.GetByIdAsync(id);
            if (album == null)
            {
                return NotFound();
            }

            await _albumService.DeleteValueAsync(album);
            return NoContent(); // 204 - הצלחה ללא תוכן
        }
        
       

       
        
       
    }
}
