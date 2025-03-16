using Gallery.CORE.models;
using Gallery.CORE.Repositories;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _userService.GetAllAsync();
        }

        [HttpGet("{id")]
        public async Task<User> GetByIdAsync(int id)
        {
            return await _userService.GetByIdAsync(id);
        }
        [HttpPost]
        public async Task PostAsync([FromBody] User user)
        {
            await _userService.AddValueAsync(user);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id,[FromBody] User user)
        {
            if (id != user.Id)
            {
                return BadRequest("The ID in the URL does not match the ID in the request body.");
            }

            var existingUser = await _userService.GetByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }
            await _userService.UpdateValueAsync(user);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userService.DeleteValueAsync(user);
            return NoContent(); // 204 - הצלחה ללא תוכן
        }
        
       

       
        
       
    }
}
