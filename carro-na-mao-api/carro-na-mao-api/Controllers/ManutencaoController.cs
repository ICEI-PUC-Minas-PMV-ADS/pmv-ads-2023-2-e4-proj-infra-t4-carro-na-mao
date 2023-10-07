using carro_na_mao_api.Models.Manutencao;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ManutencaoController : ControllerBase
    {
        private readonly ManutencaoService _manutencaoService;

        public ManutencaoController(ManutencaoService manutencaoService)
        {
            _manutencaoService = manutencaoService;
        }
        [HttpGet]
        public async Task<List<Manutencao>> findAll()
            => await _manutencaoService.getAsync();

        [HttpGet("/find-by-manutencao")]
        public async Task<Manutencao> findbyValue(int vl_manutencao)
            => await _manutencaoService.findByValue(vl_manutencao);

        [HttpPost]
        public async Task<Manutencao> CreateManutencao(Manutencao manutencao)
        {
            await _manutencaoService.CreateAsync(manutencao);

            return manutencao;
        }
        [HttpPut]
        public async Task<Manutencao> UpdateManutencao(string id, Manutencao manutencao)
        {
            await _manutencaoService.UpdateAsync(id, manutencao);
            return manutencao;
        }
        [HttpDelete]
        public async Task DeleteManutencao(int id_manutencao)
        {
            await _manutencaoService.DeleteAsync(id_manutencao);
        }
    }
}
