using carro_na_mao_api.Models.Vistoria;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carro_na_mao_api.Service
{
    public class VistoriaService
    {
        private readonly IMongoCollection<Vistoria> _vistoriaCollection;

        public VistoriaService(IOptions<VistoriaDatabaseSettings> vistoriaService)
        {
            var mongoClient = new MongoClient(vistoriaService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(vistoriaService.Value.DatabaseName);

            _vistoriaCollection = mongoDatabase.GetCollection<Vistoria>
                (vistoriaService.Value.VistoriaCollectionName);

        }

        public async Task<List<Vistoria>> getAsync() =>
           await _vistoriaCollection.Find(x => true).ToListAsync();

        public async Task<Vistoria> getAsyncId(int id) =>
            await _vistoriaCollection.Find(x => x.id_veiculo == id).SingleOrDefaultAsync();
        public async Task CreateAsync(Vistoria vistoria) =>
           await _vistoriaCollection.InsertOneAsync(vistoria);
        public async Task UpdateAsync(string id, Vistoria vistoria)
        {
            vistoria.id_vistoria = id;
            await _vistoriaCollection.ReplaceOneAsync(x => x.id_vistoria == id, vistoria);

        }
        public async Task<List<Vistoria>> GetVistoriasByVeiculo(int idVeiculo)
        {
            var filter = Builders<Vistoria>.Filter.Eq(v => v.id_veiculo, idVeiculo);
            var vistorias = await _vistoriaCollection.Find(filter).ToListAsync();
            return vistorias;
        }
        public async Task DeleteAsync(int id) =>
           await _vistoriaCollection.DeleteOneAsync(x => x.id_veiculo == id);

        internal Task<Vistoria> findByValue(int vl_vistoria)
        {
            throw new NotImplementedException();
        }
    }
}