using AutoMapper;
using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Services;
using Gallery.SERVICE;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // GET: ImagesController
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var list = await _userService.GetAllAsync();
            var listDto = _mapper.Map<IEnumerable<UserDtoSystem>>(list);
            return Ok(listDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserPostDto user)
        {
            var dto = _mapper.Map<User>(user);
            await _userService.AddValueAsync(dto);
            return Ok(dto);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UserPostDto user)
        {
            var existingUser = await _userService.GetByIdAsync(id);
            if (existingUser != null)
            {
                // אם התג קיים, עדכון פשוט
                existingUser.FullName = user.FullName;
                existingUser.Email = user.Email;
                existingUser.Password = user.Password;
                existingUser.Role = user.Role;
                await _userService.UpdateValueAsync(existingUser);  // כאן אנחנו פשוט מעדכנים
                return Ok(existingUser);
            }
            return NoContent();  // 204 No Content
        }
        [Authorize (Roles = "admin")]
        [HttpPut("system/{id}")]
        public async Task<ActionResult> PutForAdmin(int id, [FromBody] UserUpdateDtoSystem user)
        {
            var existingUser = await _userService.GetByIdAsync(id);
            if (existingUser != null)
            {
                // אם התג קיים, עדכון פשוט
                existingUser.FullName = user.FullName;
                existingUser.Email = user.Email;
                existingUser.Password = user.Password;
                existingUser.Role = user.Role;
                existingUser.LastUpdatedAt = DateTime.UtcNow;
                await _userService.UpdateValueAsync(existingUser);  // כאן אנחנו פשוט מעדכנים
                return Ok(existingUser);
            }
            return NoContent();  // 204 No Content
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
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
