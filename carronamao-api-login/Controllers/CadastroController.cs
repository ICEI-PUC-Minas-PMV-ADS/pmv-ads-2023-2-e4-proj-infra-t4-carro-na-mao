using carronamao_api_login.Models;
using carronamao_api_login.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carronamao_api_login.Controllers
{
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
        public async Task<List<Cadastro>>GetCadastros() => await _cadastroService.GetAsync();

        [HttpPost]
        public async Task PostCadastro(Cadastro cadastro)
        {
            await _cadastroService.CreateAsync(cadastro);
        
        }
        [HttpDelete]
        public async Task DeleteCdastro(string id)
        {
             await _cadastroService.RemoveAsync(id);
        }
        [HttpPut]

        public async Task updateCadastor(string id, Cadastro cadastro)
        {
  
            await _cadastroService.updateAsync(id, cadastro);
            
        }
    }
}

