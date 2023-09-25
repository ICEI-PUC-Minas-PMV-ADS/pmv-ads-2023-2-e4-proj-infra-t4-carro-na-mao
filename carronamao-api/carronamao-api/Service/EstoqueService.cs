using carronamao_api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carronamao_api.Service
{
    public class EstoqueService
    {
        private readonly IMongoCollection<Estoque> _estoqueCollection;

        public EstoqueService(IOptions<EstoqueDatabaseSettings> estoqueService) 
        {
            var mongoClient = new MongoClient(estoqueService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(estoqueService.Value.DatabaseName);

            _estoqueCollection = mongoDatabase.GetCollection<Estoque>(estoqueService.Value.EstoqueCollectionName);
        }

        public async Task<List<Estoque>> getAsync() =>
            await _estoqueCollection.Find(x => true).ToListAsync();

        public async Task<Estoque> getAsyncId(int id) =>
            await _estoqueCollection.Find(x => x.id_estoque == id).SingleOrDefaultAsync();

        public async Task CreateAsync (Estoque estoque) =>
            await _estoqueCollection.InsertOneAsync(estoque);

        public async Task UpdateAsync(int id, Estoque estoque) =>
            await _estoqueCollection.ReplaceOneAsync(x => x.id_estoque == id, estoque);

        public async Task DeleteAsync(int id) =>
            await _estoqueCollection.DeleteOneAsync(x => x.id_veiculo == id);
    }
}
