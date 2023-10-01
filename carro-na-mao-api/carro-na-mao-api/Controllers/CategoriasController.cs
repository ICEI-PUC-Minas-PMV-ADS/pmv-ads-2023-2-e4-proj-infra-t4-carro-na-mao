using carro_na_mao_api.Models.Categoria;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly CategoriaService _categoriaService;

        public CategoriasController(CategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<List<Categoria>> findAll()
            => await _categoriaService.getAsync();

        [HttpGet("/find-by-value")]
        public async Task<Categoria> findByValue(int vl_categoria)
            => await _categoriaService.findByValue(vl_categoria);

        [HttpPost]
        public async Task<Categoria> CreateCategoria(Categoria categoria)
        {
            await _categoriaService.CreateAsync(categoria);

            return categoria;
        }

        [HttpPut]
        public async Task<Categoria> UpdateCategoria(string id, Categoria categoria)
        {
            await _categoriaService.UpdateAsync(id, categoria);

            return categoria;
        }

        [HttpDelete]
        public async Task DeleteCategoria(string id)
        {
            await _categoriaService.DeleteAsync(id);
        }
    }
}
