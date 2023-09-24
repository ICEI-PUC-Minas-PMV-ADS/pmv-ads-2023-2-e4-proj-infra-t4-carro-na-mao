using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace carronamao_api_login.Models
{
    public class Cadastro
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        
        [BsonElement("Nome")]
        public string Nome { get; set; } = null;
        [BsonElement("Data nascimento")]
        public string DataNacimento { get; set; } = null;
        
        [BsonElement("Endereço")]
        public string endereco { get; set; } = null;

        [BsonElement("CPF")]
        public string cpf { get; set; } = null;
        
        [BsonElement("Telefone")]
        public string Telefone { get; set; } = null;

        [BsonElement("Email")]
        public string email { get; set; } = null;

        [BsonElement("Senha")]
        public string senha { get; set; } = null;

        [BsonElement("Restrições")]
        public string restricoes { get; set; } = null;
        [BsonElement("Categoria Habilitação")]
        public string categoriaHabilitacao { get; set; } = null;

        [BsonElement("Ativo ?")]
        public Boolean usuarioAtivo { get; set; }
    }
}
