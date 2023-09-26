using carronamao_api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carronamao_api.Service
{
    public class RetiradaService
    {
        private readonly IMongoCollection<Retirada> _retiradaCollection;

        public RetiradaService(IOptions<RetiradaDatabaseSettings> retiradaService)
        {
            var mongoClient = new MongoClient(retiradaService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(retiradaService.Value.DatabaseName);

            _retiradaCollection = mongoDatabase.GetCollection<Retirada>(retiradaService.Value.RetiradaCollectionName);
        }

        public async Task<List<Retirada>> findAll() =>
            await _retiradaCollection.Find(x => true).ToListAsync();

        public async Task<Retirada> findByLocacao(string id) =>
            await _retiradaCollection.Find(x => x.id_locacao == id).SingleOrDefaultAsync();

        public async Task CreateAsync(Retirada retirada) =>
            await _retiradaCollection.InsertOneAsync(retirada);

        public async Task DeleteAsync(string id) =>
            await _retiradaCollection.DeleteOneAsync(x => x.id_retirada == id);
    }
}
