﻿using carro_na_mao_api.Models.Cadastro;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CadastroController : ControllerBase
    {
        private readonly CadastroService _cadastroService;

        public CadastroController(CadastroService cadastroService)
        {
            _cadastroService = cadastroService;
        }
        [HttpGet]
        public async Task<List<Cadastro>> GetCadastros() => await _cadastroService.GetAsync();

        [HttpPost]
        public async Task PostCadastro(Cadastro cadastro)
        {
            await _cadastroService.CreateAsync(cadastro);

        }
        [HttpDelete]
        public async Task DeleteCdastro(string id)
        {
            await _cadastroService.RemoveAsync(id);
        }
        [HttpPut]

        public async Task<Cadastro> updateCadastor(string id, Cadastro cadastro)
        {

            await _cadastroService.updateAsync(id, cadastro);

            return cadastro;

        }
    }
}
