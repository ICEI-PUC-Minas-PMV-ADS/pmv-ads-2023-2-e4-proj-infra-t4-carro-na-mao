using carro_na_mao_api.Models.Avaliacao;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carro_na_mao_api.Service
{
    public class AvaliacaoServices
    {
        private readonly IMongoCollection<Avaliacao> _avaliacaoCollection;

        public AvaliacaoServices(IOptions<AvaliacaoDatabaseSettings> avaliacaoServices)
        {
            var mongoClient= new MongoClient(avaliacaoServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(avaliacaoServices.Value.DatabaseName);

            _avaliacaoCollection = mongoDatabase.GetCollection<Avaliacao>
                (avaliacaoServices.Value.AvaliacaoCollectionName);

        }

        public async Task<List<Avaliacao>> GetAsync() =>
            await _avaliacaoCollection.Find( x => true).ToListAsync();
        public async Task<Avaliacao> GetAsync(string id) =>
             await _avaliacaoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Avaliacao avalicao) =>
            await _avaliacaoCollection.InsertOneAsync(avalicao);
        public async Task UpdateAsyn(string id, Avaliacao avalicao) =>
            await _avaliacaoCollection.ReplaceOneAsync(x => x.Id == id, avalicao);
        public async Task RemoveAsync(string id) =>
            await _avaliacaoCollection.DeleteOneAsync(x => x.Id == id);

    }
}
