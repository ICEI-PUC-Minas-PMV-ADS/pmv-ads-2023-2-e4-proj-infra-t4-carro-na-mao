using carro_na_mao_api.Models.Multa;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MutaController : ControllerBase
    {
        private readonly MultaService _multaService;
        public MutaController(MultaService multaService)
        {
            _multaService = multaService;
        }
        [HttpGet]
        public async Task<List<Multa>> GetMultas() =>
            await _multaService.GetAsync();
        [HttpPost]
        public async Task<Multa> PostMulta(Multa multa)
        {
            await _multaService.CreateAsync(multa);
            return multa;
        }
    }
}

