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
        //Metodo para listar todas as tabelas dentro do banco
        public async Task<List<Cadastro>>GetAsync() => await _cadastroCollection.Find(x=>true).ToListAsync();

        //Meto para colocar dados no banco

        public async Task CreateAsync(Cadastro cadastro) => await _cadastroCollection.InsertOneAsync(cadastro);


    }
}
