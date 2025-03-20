using Gallery.CORE.models;
using Gallery.CORE.Models;
using Gallery.CORE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;

namespace Gallery.API.Controllers
{
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IRepositoryService<User> _usersService;

        public AuthController(IConfiguration configuration, IRepositoryService<User> repositoryService)
        {
            _configuration = configuration;
            _usersService = repositoryService;
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] Login loginModel)
        {
           IEnumerable<User> users = await _usersService.GetAllAsync();
            User user = users.FirstOrDefault(user => loginModel.Email == user.Email && loginModel.Password == user.Password);

            if (user != null)
            {
                var claims = new List<Claim>();
                var email = new Claim(ClaimTypes.Email, user.Email);
                var role = new Claim(ClaimTypes.Role, user.Role);
                var name = new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName);
               // var userId = new Claim(ClaimTypes., user.Id);
                claims.Add(email);claims.Add(role);claims.Add(name);
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });

            }
            return Unauthorized();
        }
    }

}

