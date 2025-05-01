using AutoMapper;
using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Models;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionsController : ControllerBase
    {
        private readonly IPermissionsService _permissionsService;
        private readonly IMapper _mapper;

        public PermissionsController(IPermissionsService permissionsService, IMapper mapper)
        {
            _permissionsService = permissionsService;
            _mapper = mapper;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var list = await _permissionsService.GetAllAsync();
            var listDto = _mapper.Map<IEnumerable<PermissionsDto>>(list);
            return Ok(listDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {

            var per = await _permissionsService.GetByIdAsync(id);
            var perDto = _mapper.Map<PermissionsDto>(per);
            return Ok(perDto);
        }
        [HttpPost]
        public async Task PostAsync([FromBody] PermissionsPostDto permissions)
        {
            var dto = _mapper.Map<Permissions>(permissions);
            await _permissionsService.AddValueAsync(dto);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PermissionsPostDto permissions)
        {
      
            var existingPermissions = await _permissionsService.GetByIdAsync(id);
            if (existingPermissions != null)
            {
               
                existingPermissions.User.Id = permissions.UserId;
                existingPermissions.Album.Id = permissions.AlbumId;
                existingPermissions.Permission=permissions.Permission;
                existingPermissions.Validity = permissions.Validity;
                await _permissionsService.UpdateValueAsync(existingPermissions);
                return Ok(existingPermissions);  
            }
            return NoContent();// 204 No Content 
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var permissions = await _permissionsService.GetByIdAsync(id);
            if (permissions == null)
            {
                return NotFound();
            }

            await _permissionsService.DeleteValueAsync(permissions);
            return NoContent(); // 204 - הצלחה ללא תוכן
        }






    }
}
