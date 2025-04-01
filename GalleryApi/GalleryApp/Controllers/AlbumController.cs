using AutoMapper;
using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Services;
using Gallery.SERVICE;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;
        private readonly IMapper _mapper;

        public AlbumController(IAlbumService albumService,IMapper mapper)
        {
            _albumService = albumService;
            _mapper = mapper;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var list= await _albumService.GetAllAsync();
            var listDto=_mapper.Map<IEnumerable<AlbumDto>>(list); 
            return Ok(listDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var album= await _albumService.GetByIdAsync(id);
            var albumDto=_mapper.Map<AlbumDto>(album);
            return Ok(albumDto);
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult> GetByUserId(int userId)
        {
            var list = await _albumService.GetAlbumOfUserAsync(userId);
            var listDto = _mapper.Map<IEnumerable<AlbumDto>>(list);
            return Ok(listDto);
        }
        [HttpPost]
        public async Task Post([FromBody] AlbumPostDto album)
        {
            var dto=_mapper.Map<Album>(album);
            await _albumService.AddValueAsync(dto);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,[FromBody] AlbumUpdateDto album)
        {
            var existingAlbum = await _albumService.GetByIdAsync(id);
            if (existingAlbum != null)
            {
                existingAlbum.Description = album.Description;
                existingAlbum.Name=album.Name;
                existingAlbum.UpdateAt = DateTime.UtcNow;
                
              await _albumService.UpdateValueAsync(existingAlbum);  // כאן אנחנו פשוט מעדכנים
              return Ok(existingAlbum);
            }

            return NoContent();  // 204 No Content
            
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
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
