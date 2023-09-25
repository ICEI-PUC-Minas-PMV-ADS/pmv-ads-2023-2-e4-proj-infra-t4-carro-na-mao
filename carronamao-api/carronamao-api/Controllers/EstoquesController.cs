using carronamao_api.Models;
using carronamao_api.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carronamao_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstoquesController : ControllerBase
    {
        private readonly EstoqueService _estoqueService;

        public EstoquesController(EstoqueService estoqueService) 
        {
            _estoqueService = estoqueService;
        }

        [HttpGet]
        public async Task<List<Estoque>> FindAll()
            => await _estoqueService.getAsync();

        [HttpGet]
        public async Task<Estoque> FindById(int id)
            => await _estoqueService.getAsyncId(id);

        [HttpPost]
        public async Task<Estoque> CreateEstoque(Estoque estoque)
        {
            await _estoqueService.CreateAsync(estoque);

            return estoque;
        }

        [HttpPut]
        public async Task<Estoque> UpdateEstoque(int id, Estoque estoque)
        {
            await _estoqueService.UpdateAsync(id, estoque);

            return estoque;
        }

        [HttpDelete]
        public async Task DeleteEstoque (int id)
        {
            await _estoqueService.DeleteAsync(id);
        }
    }
}
