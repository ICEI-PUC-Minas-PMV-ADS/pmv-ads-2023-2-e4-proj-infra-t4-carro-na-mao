using carro_na_mao_api.Models.Historico;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HitoricoController : ControllerBase
    {
        private readonly HistoricoService _historicoService;
        public HitoricoController(HistoricoService historicoService)
        {
            _historicoService = historicoService;
        }
        [HttpGet]
        public async Task<List<Historico>> GetHistoricos() =>
            await _historicoService.GetAsync();
        [HttpPost]
        public async Task<Historico> PostHistorico (Historico historico)
        {
            await _historicoService.CreateAsync(historico);
            return historico;
        }
    }
}
