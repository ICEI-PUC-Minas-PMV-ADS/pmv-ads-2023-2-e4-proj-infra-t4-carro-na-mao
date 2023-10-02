using carro_na_mao_api.Models.Vistoria;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VistoriasController : ControllerBase
    {
        private readonly VistoriaService _vistoriaService;

        public VistoriasController(VistoriaService vistoriaService)
        {
            _vistoriaService = vistoriaService;
        }

        [HttpGet]
        public async Task<List<Vistoria>> findAll()
          => await _vistoriaService.getAsync();


        [HttpGet("/find-by-vistoria")]
        public async Task<Vistoria> findByValue(int vl_vistoria)
             => await _vistoriaService.findByValue(vl_vistoria);

        [HttpPost]
        public async Task<Vistoria> CreateVistoria(Vistoria vistoria)
        {
            await _vistoriaService.CreateAsync(vistoria);

            return vistoria;
        }

        [HttpPut]
        public async Task<Vistoria> UpdateVistoria(string id, Vistoria vistoria)
        {
            await _vistoriaService.UpdateAsync(id, vistoria);

            return vistoria;
        }

        [HttpDelete]
        public async Task DeleteVistoria(int id_vistoria)
        {
            await _vistoriaService.DeleteAsync(id_vistoria);
        }
    }
}
