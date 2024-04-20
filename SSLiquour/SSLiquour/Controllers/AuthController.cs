using Microsoft.AspNetCore.Mvc;
using SSLiquour.Interfaces;
using SSLiquour.Models;
using SSLiquour.RequestModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SSLiquour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST api/<AuthController>
        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest loginModel)
        {
            var token = _authService.Login(loginModel);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { message = "Authentication failed" }); // Sends a 401 with a JSON message
            }
            return Ok(new { token = token }); // Wraps the token in an object, which will be serialized to JSON
        }


        // PUT api/<AuthController>/5
        [HttpPost("addUser")]
        public IActionResult AddUser([FromBody] User user)
        {
            var addedUser = _authService.AddUser(user);
            if (addedUser == null)
            {
                return BadRequest(new { message = "Failed to add user" }); // Sends a 400 status with a JSON message
            }
            return Ok(addedUser); // Returns the added user data serialized as JSON
        }

    }
}
