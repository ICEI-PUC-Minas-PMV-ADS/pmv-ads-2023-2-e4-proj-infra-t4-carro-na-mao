using carro_na_mao_api.Models.Manutencao;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carro_na_mao_api.Service
{
    public class ManutencaoService
    {
        private readonly IMongoCollection<Manutencao> _manutencaoCollection;

        public ManutencaoService(IOptions<ManutencaoDatabaseSettings> manutencaoService)
        {
            var mongoClient = new MongoClient(manutencaoService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(manutencaoService.Value.DatabaseName);

            _manutencaoCollection = mongoDatabase.GetCollection<Manutencao>
                (manutencaoService.Value.ManutencaoCollectionName);
        }

        public async Task<List<Manutencao>> getAsync() =>
            await _manutencaoCollection.Find(x => true).ToListAsync();

        public async Task<Manutencao> getAsyncId(int id) =>
            await _manutencaoCollection.Find(x => x.id_veiculo == id).SingleOrDefaultAsync();

        public async Task CreateAsync(Manutencao manutencao) =>
            await _manutencaoCollection.InsertOneAsync(manutencao);

        public async Task UpdateAsync(string id, Manutencao manutencao)
        {
            manutencao.id_manutencao = id;
            await _manutencaoCollection.ReplaceOneAsync(x => x.id_manutencao == id, manutencao);
        }
        public async Task DeleteAsync(int id) =>
            await _manutencaoCollection.DeleteOneAsync(x => x.id_veiculo == id);
        internal Task<Manutencao> findByValue(int vl_manutencao)
        {
            throw new NotImplementedException();
        }
    }
}
