using carro_na_mao_api.Models.Cadastro;
using carro_na_mao_api.Models.Retirada;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carro_na_mao_api.Service
{
    public class CadastroService
    {
        private readonly IMongoCollection<Cadastro> _cadastroCollection;

        public CadastroService(IOptions<CadastroDataBase> cadastroService)
        {
            var mongoClient = new MongoClient(cadastroService.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(cadastroService.Value.DatabaseName);

            _cadastroCollection = mongoDatabase.GetCollection<Cadastro>(cadastroService.Value.CadastroCollectionName);
        }

        public async Task<List<Cadastro>> GetAsync() =>
            await _cadastroCollection.Find(x => true).ToListAsync();

        public async Task<Cadastro> GetAsyncEmail(string email, string senha) =>
            await _cadastroCollection.Find(x => x.email == email && x.senha ==senha ).SingleOrDefaultAsync();
        public async Task<Cadastro> GetAsyncUser(string id) =>
           await _cadastroCollection.Find(x => x.Id == id).SingleOrDefaultAsync();


        public async Task CreateAsync(Cadastro cadastro) =>
            await _cadastroCollection.InsertOneAsync(cadastro);

        public async Task UpdateAsync(string id, Cadastro cadastro)
        {
            cadastro.Id = id;
            await _cadastroCollection.ReplaceOneAsync(x => x.Id == id, cadastro);
        }


        public async Task RemoveAsync(string id) =>
            await _cadastroCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<Cadastro> findByUser(string id) =>
            await _cadastroCollection.Find(x => x.Nome == id).SingleOrDefaultAsync();

    }
}
