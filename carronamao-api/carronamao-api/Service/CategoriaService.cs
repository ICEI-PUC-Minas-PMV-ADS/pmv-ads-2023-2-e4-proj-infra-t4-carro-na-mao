using carronamao_api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carronamao_api.Service
{
    public class CategoriaService
    {
        private readonly IMongoCollection<Categoria> _categoriaCollection;
    
        public CategoriaService(IOptions<CategoriaDatabaseSettings> categoriaService)
        {
            var mongoClient = new MongoClient(categoriaService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(categoriaService.Value.DatabaseName);

            _categoriaCollection = mongoDatabase.GetCollection<Categoria>(categoriaService.Value.CategoriaCollectionName);
        }

        public async Task<List<Categoria>> getAsync() =>
            await _categoriaCollection.Find(x => true).ToListAsync();

        public async Task<Categoria> findByValue(int valor) =>
            await _categoriaCollection.Find(x => x.vl_categoria == valor).SingleOrDefaultAsync();

        public async Task CreateAsync (Categoria categoria) =>
            await _categoriaCollection.InsertOneAsync(categoria);

        public async Task UpdateAsync(string id, Categoria categoria) =>
            await _categoriaCollection.ReplaceOneAsync(x => x.id_categoria == id , categoria);

        public async Task DeleteAsync(string id) =>
            await _categoriaCollection.DeleteOneAsync(x => x.id_categoria == id);
   }
}
