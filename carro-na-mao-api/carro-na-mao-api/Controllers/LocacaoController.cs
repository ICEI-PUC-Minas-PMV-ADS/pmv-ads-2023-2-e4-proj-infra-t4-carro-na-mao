
using carro_na_mao_api.Models.Reservas;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocacaoController : ControllerBase
    {
        private readonly LocacaoService _locacaoService;

        public LocacaoController(LocacaoService locacaoService)
        {
            _locacaoService = locacaoService;
        }

        [HttpGet]
        public async Task<List<Locacao>> findAll()
            => await _locacaoService.getAsync();


        [HttpGet("/find-by-categoria")]
        public async Task<Locacao> findById(string id_categoria)
             => await _locacaoService.getAsyncId(id_categoria);

        [HttpPost]
        public async Task<Locacao> CreateLocacao(Locacao locacao)
        {
            await _locacaoService.CreateAsync(locacao);

            return locacao;
        }

        [HttpPut]
        public async Task<Locacao> UpdateLocacao(string id, Locacao locacao)
        {
            await _locacaoService.UpdateAsync(id, locacao);

            return locacao;
        }

        [HttpDelete]
        public async Task DeleteLocacao(string id_categoria)
        {
            await _locacaoService.DeleteAsync(id_categoria);
        }
    }
}
