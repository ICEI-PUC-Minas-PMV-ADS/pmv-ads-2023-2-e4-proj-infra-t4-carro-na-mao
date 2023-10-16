using carro_na_mao_api.Models.Historico;
using carro_na_mao_api.Models.Locacoes;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carro_na_mao_api.Service
{
    public class HistoricoService
    {
        private readonly IMongoCollection<Historico> _historicoCollection;
        public HistoricoService(IOptions<HistoricoDatabaseSettings> historicoService)
        {
            var mongoClient = new MongoClient(historicoService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(historicoService.Value.DatabaseName);

            _historicoCollection = mongoDatabase.GetCollection<Historico>
                (historicoService.Value.HistoricoCollectionName);


        }

        public async Task<List<Historico>> GetAsync() =>
            await _historicoCollection.Find(x => true).ToListAsync();

        public async Task<Historico> GetAsync(string id) =>
            await _historicoCollection.Find(x => x.Id_historico  == id).FirstOrDefaultAsync();

        public async Task CreateAsync (Historico historico) =>
            await _historicoCollection.InsertOneAsync(historico);

        public async Task UpdateAsync(string id, Historico historico) =>
            await _historicoCollection.ReplaceOneAsync(x => x.Id_historico == id, historico);
        public async Task RemoveAsync(string id) =>
            await _historicoCollection.DeleteOneAsync(x => x.Id_historico == id);
        // ---verificar id referenciando locaçao---



    }
}
