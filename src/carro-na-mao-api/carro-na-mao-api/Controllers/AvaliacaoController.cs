using carro_na_mao_api.Models.Avaliacao;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using carro_na_mao_api.Service;
using carro_na_mao_api.Models.Estoque;
using carro_na_mao_api.Models.Cadastro;

namespace carro_na_mao_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AvaliacaoController : ControllerBase
    {
        private readonly AvaliacaoServices _avaliacaoServices;
        private object avaliacao;

        public AvaliacaoController(AvaliacaoServices avaliacaoServices)
        {
            _avaliacaoServices = avaliacaoServices;
        }

        [HttpGet]
        public async Task<List<Avaliacao>> GetAvaliacao()
          => await _avaliacaoServices.GetAsync();

        [HttpPost]
        public async Task<Avaliacao> PostAvaliacao(Avaliacao avaliacao)
        {
            await _avaliacaoServices.CreateAsync(avaliacao);
            return avaliacao;
        }

        [HttpDelete]
        public async Task DeleteAvaliacao(string id)
        {
            await _avaliacaoServices.RemoveAsync(id);

        }

        [HttpPut]
        public async Task<Avaliacao> UpdateAvaliacao(string id, Avaliacao avaliacao)
        {
            await _avaliacaoServices.UpdateAsyn(id, avaliacao);

            return (Avaliacao)avaliacao;
        }

        [HttpGet("find-by-avaliacao")]
        public async Task<Avaliacao> GetAsyncAvaliacao(string id_user)
        {
            return await _avaliacaoServices.GetAsyncAvaliacao(id_user);
        }
    }
}
