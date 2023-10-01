using carro_na_mao_api.Models.Retirada;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RetiradasController : ControllerBase
    {
        private readonly RetiradaService _retiradaService;

        public RetiradasController(RetiradaService retiradaService)
        {
            _retiradaService = retiradaService;
        }

        [HttpGet]
        public async Task<List<Retirada>> findAll()
            => await _retiradaService.findAll();

        [HttpGet("find-by-locacao")]
        public async Task<Retirada> findByLocacao(string id_locacao)
            => await _retiradaService.findByLocacao(id_locacao);

        [HttpPost]
        public async Task<Retirada> CreateRetirada(Retirada retirada)
        {
            await _retiradaService.CreateAsync(retirada);

            return retirada;
        }

        [HttpDelete]
        public async Task DeleteRetirada(string id_retirada)
        {
            await _retiradaService.DeleteAsync(id_retirada);
        }
    }
}
