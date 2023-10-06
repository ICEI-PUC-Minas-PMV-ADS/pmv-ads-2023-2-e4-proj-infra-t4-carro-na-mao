using carro_na_mao_api.Models.Multa;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carro_na_mao_api.Service
{
    public class MultaServices
    {
        private readonly IMongoCollection<Multa> _multaCollection;

        public MultaServices(IOptions<MultaDatabaseSettings> multaServices)
        {
            var mongoClient = new MongoClient(multaServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(multaServices.Value.DatabaseName);

            _multaCollection = mongoDatabase.GetCollection<Multa>
                (multaServices.Value.MultaCollectionNome);             
            }

        public async Task<List<Multa>> GetAsync() =>
           await _multaCollection.Find(x => true).ToListAsync();

        public async Task<Multa> GetAsync(string id) =>
            await _multaCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Multa multa) =>
            await _multaCollection.InsertOneAsync(multa);
        public async Task UpdateAsync(string id, Multa multa) =>
         await _multaCollection.ReplaceOneAsync(x =>x.Id == id, multa);
    }
}
