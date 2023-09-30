using carro_na_mao_api.Models.Cadastro;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CadastroController : ControllerBase
    {
        private readonly AvaliacaoService _cadastroService;

        public CadastroController(AvaliacaoService cadastroService)
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
        [HttpDelete]
        public async Task DeleteCdastro(string id)
        {
            await _cadastroService.RemoveAsync(id);
        }
        [HttpPut]

        public async Task<Cadastro> UpdateCadastor(string id, Cadastro cadastro)
        {

            await _cadastroService.UpdateAsync(id, cadastro);

            return cadastro;

        }
    }
}
