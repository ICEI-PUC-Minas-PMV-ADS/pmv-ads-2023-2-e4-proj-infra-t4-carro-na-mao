﻿using carronamao_api.Models;
using carronamao_api.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carronamao_api.Controllers
{
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