using carro_na_mao_api.Models.Estoque;
using carro_na_mao_api.Models.Locacoes;
using carro_na_mao_api.Models.Reservas;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carro_na_mao_api.Service
{
    public class LocacaoService
    {
        private readonly IMongoCollection<Locacao> _locacaoCollection;


        public LocacaoService(IOptions<LocacaoDatabaseSettings> locacaoService)
        {

            var MongoClient = new MongoClient(locacaoService.Value.ConnectionString);
            var mongoDatabase = MongoClient.GetDatabase(locacaoService.Value.DatabaseName);

            _locacaoCollection = mongoDatabase.GetCollection<Locacao>(locacaoService.Value.LocacaoCollectionName);
        }

        public async Task<List<Locacao>> GetAsync() =>
            await _locacaoCollection.Find(x => true).ToListAsync();

        public async Task<Locacao> getAsyncId(string id) =>
            await _locacaoCollection.Find(x => x.id_categoria == id).SingleOrDefaultAsync();

        public async Task CreateAsync(Locacao locacao) =>
            await _locacaoCollection.InsertOneAsync(locacao);

        public async Task UpdateAsync(string id, Locacao locacao)
        {
            locacao.id_locacao = id;
            await _locacaoCollection.ReplaceOneAsync(x => x.id_locacao == id, locacao);
        }

        public async Task DeleteAsync(string id) =>
            await _locacaoCollection.DeleteOneAsync(x => x.id_locacao == id);

        internal Task<List<Locacao>> getAsync()
        {
            throw new NotImplementedException();
        }
    }
}
