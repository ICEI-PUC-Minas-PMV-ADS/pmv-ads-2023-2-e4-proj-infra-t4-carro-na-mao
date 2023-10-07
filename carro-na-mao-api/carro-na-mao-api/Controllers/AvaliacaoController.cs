using carro_na_mao_api.Models.Avaliacao;
using carro_na_mao_api.Models.Estoque;
using carro_na_mao_api.Service;
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
            await _avaliacaoServices.createAsync(avaliacao);
            return avaliacao;
        }
        
        [HttpDelete]
        public async Task DeleteAvaliacao(int id_veiculo)
        {
            await _avaliacaoServices.DeleteAsync(id_veiculo);
            
        }
        
        [HttpPut]
        public async Task<Avaliacao> UpdateAvaliacao(string id, Estoque estoque)
        {
            await _avaliacaoServices.UpdateAsync(id, avaliacao);

            return (Avaliacao)avaliacao;
        }
    }
}
