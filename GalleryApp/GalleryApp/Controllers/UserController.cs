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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService,IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // GET: ImagesController
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var list = await _userService.GetAllAsync();
            var listDto = _mapper.Map<IEnumerable<UserDto>>(list);
            return Ok(listDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var user=await _userService.GetByIdAsync(id);
            var userDto=_mapper.Map<UserDto>(user);
            return Ok(userDto);
        }
        [HttpPost]
        public async Task Post([FromBody] UserPostDto user)
        {
            var dto=_mapper.Map<User>(user);
            await _userService.AddValueAsync(dto);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,[FromBody] UserPostDto user)
        {
            var existingUser = await _userService.GetByIdAsync(id);
            if (existingUser != null)
            {
                // אם התג קיים, עדכון פשוט
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.Email = user.Email;
                existingUser.Password=user.Password;
                existingUser.Role=user.Role;
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
