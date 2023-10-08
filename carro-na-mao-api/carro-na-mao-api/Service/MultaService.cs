using carro_na_mao_api.Models.Multa;
using Microsoft.Extensions.Options;
using MongoDB.Driver;



namespace carro_na_mao_api.Service
{
    public class MultaService
    {
        private readonly IMongoCollection<Multa> _multaCollection;
        public MultaService(IOptions<MultaDataBaseSettings> multaService)
        {
            var mongoClient = new MongoClient(multaService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(multaService.Value.DatabaseName);

            _multaCollection = mongoDatabase.GetCollection<Multa>
                (multaService.Value.HistoricoCollectionName);
        }

        public async Task<List<Multa>> GetAsync() =>
            await _multaCollection.Find(x => true).ToListAsync();

        public async Task<Multa> GetAsync(string id) =>
            await _multaCollection.Find(x => x.Id_multa == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Multa multa) =>
            await _multaCollection.InsertOneAsync(multa);

        public async Task UpdateAsync(string id, Multa multa) =>
            await _multaCollection.ReplaceOneAsync(x => x.Id_multa == id, multa);
        public async Task RemoveAsync(string id) =>
            await _multaCollection.DeleteOneAsync(x => x.Id_multa == id);

    }
}
