using AutoMapper;
using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Models;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Gallery.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _usersService;
        private readonly IMapper _mapper;

        public AuthController(IConfiguration configuration, IUserService repositoryService, IMapper mapper)
        {
            _configuration = configuration;
            _usersService = repositoryService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] Login loginModel)
        {
            User user = await _usersService.GetByEmailAsync(loginModel.Email);

            if (user == null )
            {
                return Unauthorized("Invalid email");
            }
            if(loginModel.Password != user.Password)
            {
                return Unauthorized("Invalid password");
            }
            var token = GenerateJwtToken(user);
            var resUser = _mapper.Map<UserDto>(user);
            return Ok(new { Token = token,User=resUser });
        }
        [HttpPost("signup")]
        public async Task<IActionResult> SignUpAsync([FromBody] UserPostDto userModel)
        {
            await Console.Out.WriteLineAsync(userModel.FullName);
            User existingUser =await _usersService.GetByEmailAsync(userModel.Email);
            if (existingUser != null)
            {
                return BadRequest("Email already in use.");
            }

            var dto = _mapper.Map<User>(userModel);
            await _usersService.AddValueAsync(dto);

            var token = GenerateJwtToken(dto);
            return Ok(new { Token = token,User=dto });
        }
        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
               // new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role??"user"),
                new Claim(ClaimTypes.Name, $"{user.FullName}")
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signinCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }

}

