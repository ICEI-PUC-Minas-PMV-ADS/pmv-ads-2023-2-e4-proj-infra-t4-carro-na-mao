using carro_na_mao_api.Models.Notificacao;
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

<<<<<<< Updated upstream
        [HttpGet]
        public async Task<List<Notificacao>> GetNotificacao()
            => await _notificacaoService.getAsync();
        
        [HttpPost]
        public async Task<Notificacao> PostNotificacao(Notificacao notificacao) 
=======
        [HttpGet("Listar Notificacoes")]
        public async Task<List<Notificacao>> GetNotificacao()
            => await _notificacaoService.getAsync();

        [HttpPost("Enviar Notificacao")]
        public async Task<Notificacao> PostNotificacao(Notificacao notificacao)
>>>>>>> Stashed changes
        {
            await _notificacaoService.CreateAsync(notificacao);

            return notificacao;
        }

<<<<<<< Updated upstream
        [HttpDelete]
        public async Task DeleteNotificacao(string Id_Notificacao) 
        {
            await _notificacaoService.DeleteAsync(Id_Notificacao);
        }
    }
}
=======
        [HttpDelete("Deletar Notificacao")]
        public async Task DeleteNotificacao(string id_Notificacao)
        {
            await _notificacaoService.DeleteAsync(id_Notificacao);
        }
    }
}
>>>>>>> Stashed changes
