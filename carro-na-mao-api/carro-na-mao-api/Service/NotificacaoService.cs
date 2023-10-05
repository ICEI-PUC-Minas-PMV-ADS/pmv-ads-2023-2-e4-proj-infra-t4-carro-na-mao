using carro_na_mao_api.Models.Notificacao;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carro_na_mao_api.Service
{
    public class NotificacaoService
    {

        private readonly IMongoCollection<Notificacao> _notificacaoCollection;

        public NotificacaoService(IOptions<NotificacaoDatabaseSettings> notificacaoService)
        {
            var mongoClient = new MongoClient(notificacaoService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(notificacaoService.Value.DatabaseName);

            _notificacaoCollection = mongoDatabase.GetCollection<Notificacao>
                (notificacaoService.Value.NotificacaoCollectionName);

        }

        public async Task<List<Notificacao>> getAsync() =>
           await _notificacaoCollection.Find(x => true).ToListAsync();
        public async Task<Notificacao> GetAsyncId(string id) =>
            await _notificacaoCollection.Find(x => x.Id_notificacao == id).SingleOrDefaultAsync();
        public async Task CreateAsync(Notificacao notificacao) =>
           await _notificacaoCollection.InsertOneAsync(notificacao);
        public async Task UpdateAsync(string id, Notificacao notificacao) =>
           await _notificacaoCollection.ReplaceOneAsync(x => x.Id_notificacao == id, notificacao);
        public async Task DeleteAsync(string id) =>
           await _notificacaoCollection.DeleteOneAsync(x => x.Id_notificacao == id);

       
       /// internal Task<Notificacao> findByValue(int vl_notificacao)
       /// {
          ///  throw new NotImplementedException();
        ///} 

    }
}
