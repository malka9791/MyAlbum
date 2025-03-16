using Gallery.CORE.models;
using Gallery.CORE.Models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionsController : Controller
    {
        private readonly IPermissionsService _permissionsService;

        public PermissionsController(IPermissionsService permissionsService)
        {
            _permissionsService = permissionsService;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<IEnumerable<Permissions>> GetAllAsync()
        {
            return await _permissionsService.GetAllAsync();
        }

        [HttpGet("{id")]
        public async Task<Permissions> GetByIdAsync(int id)
        {
            return await _permissionsService.GetByIdAsync(id);
        }
        [HttpPost]
        public async Task PostAsync([FromBody] Permissions permissions)
        {
            await _permissionsService.AddValueAsync(permissions);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id,[FromBody] Permissions permissions)
        {
            if (id != permissions.Id)
            {
                return BadRequest("The ID in the URL does not match the ID in the request body.");
            }

            var existingPermissions = await _permissionsService.GetByIdAsync(id);
            if (existingPermissions == null)
            {
                return NotFound();
            }
            await _permissionsService.UpdateValueAsync(permissions);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
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
