using carronamao_api_login.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace carronamao_api_login.Service
{
    public class CadastroService
    {
        private readonly IMongoCollection<Cadastro> _cadastroCollection;

        public CadastroService(IOptions<CadastroDataBase> cadastroService) { 
            var mongoClient = new MongoClient( cadastroService.Value.ConnectionString);
            var mongoDatabase =  mongoClient.GetDatabase(cadastroService.Value.DatabaseName);

            _cadastroCollection = mongoDatabase.GetCollection<Cadastro>(cadastroService.Value.CadastroCollectionName);
        }
     
        public async Task<List<Cadastro>>GetAsync() => 
            await _cadastroCollection.Find(x=>true).ToListAsync();

        public async Task CreateAsync(Cadastro cadastro) => 
            await _cadastroCollection.InsertOneAsync(cadastro);

        public async Task updateAsync(string id, Cadastro cadastro) => 
            await _cadastroCollection.ReplaceOneAsync(x => x.Id == id, cadastro);


        public async Task RemoveAsync(string id) =>
            await _cadastroCollection.DeleteOneAsync(x => x.Id == id);

    
    }
}
