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
    public class MultaController : ControllerBase
    {
        private readonly MultaServices _multaServices;

        public MultaController(MultaServices multaServices)
        {
            _multaServices = multaServices;
        }

        [HttpGet]
        public async Task<List<Multa>> GetMultas()
            => await _multaServices.GetAsync();

        [HttpPost]
        public async  Task<Multa> CreateMulta(Multa multa)
        {
            await _multaServices.CreateAsync(multa);

            return multa;

        }
    }
}
