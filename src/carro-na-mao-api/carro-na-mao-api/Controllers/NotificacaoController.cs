﻿using carro_na_mao_api.Models.Notificacao;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carro_na_mao_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificacaoController : ControllerBase
    {
        private readonly NotificacaoService _notificacaoService;

        public NotificacaoController(NotificacaoService notificacaoService)
        {
            _notificacaoService = notificacaoService;
        }

        [HttpGet("Listar Notificacoes")]
        public async Task<List<Notificacao>> GetNotificacao()
            => await _notificacaoService.getAsync();

        [HttpPost("Enviar Notificacao")]
        public async Task<Notificacao> PostNotificacao(Notificacao notificacao)
        {
            await _notificacaoService.CreateAsync(notificacao);

            return notificacao;
        }

        [HttpDelete("Deletar Notificacao")]
        public async Task DeleteNotificacao(string id_Notificacao)
        {
            await _notificacaoService.DeleteAsync(id_Notificacao);
        }
    }
}
