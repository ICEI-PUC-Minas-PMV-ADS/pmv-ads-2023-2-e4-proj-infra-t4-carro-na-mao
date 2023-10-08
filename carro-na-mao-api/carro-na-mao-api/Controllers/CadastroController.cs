using carro_na_mao_api.Models.Authenticate;
using carro_na_mao_api.Models.Cadastro;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace carro_na_mao_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CadastroController : ControllerBase
    {
        private readonly CadastroService _cadastroService;

        public CadastroController(CadastroService cadastroService)
        {
            _cadastroService = cadastroService;
        }
        [HttpGet]
        public async Task<List<Cadastro>> GetCadastros() => await _cadastroService.GetAsync();

        [HttpPost]
        public async Task PostCadastro(Cadastro cadastro)
        {
            await _cadastroService.CreateAsync(cadastro);

        }

        [HttpGet("find-by-email")]
        public async Task<Cadastro> GetAsyncEmail(string email, string senha)
        {
            return await _cadastroService.GetAsyncEmail(email,senha);
        }

        [HttpDelete]
        public async Task DeleteCdastro(string id)
        {
            await _cadastroService.RemoveAsync(id);
        }

        [HttpPut("editar-usuario")]

        public async Task<Cadastro> UpdateCadastor(string id, Cadastro cadastro)
        {

            await _cadastroService.UpdateAsync(id, cadastro);

            return cadastro;

        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate(Authenticate model)
        {
            var usuarioDb = await _cadastroService.findByUser(model.Nome);

            if (usuarioDb == null || usuarioDb.senha != model.senha)
                return Unauthorized();

            var jwt = GenerateJwtToken(usuarioDb);

            return Ok(new {jwtToken=jwt});
        }

        private String GenerateJwtToken(Cadastro model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("Ry74cBQva5dThwbwchR9jhbtRFnJxWSZ");
            var claims = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, model.Nome),
                    new Claim(ClaimTypes.Email, model.email)
                });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
