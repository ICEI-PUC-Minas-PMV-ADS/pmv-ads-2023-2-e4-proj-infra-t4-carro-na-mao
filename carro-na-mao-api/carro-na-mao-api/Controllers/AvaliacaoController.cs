using carro_na_mao_api.Models.Avaliacao;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiMongoDB.Services;

namespace carro_na_mao_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvaliacaoController : ControllerBase
    {
        private readonly AvaliacaoServices _avaliacaoServices;

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
            await _avaliacaoServices.createAsync(avaliacao);
            return avaliacao;
        }

    }
}
