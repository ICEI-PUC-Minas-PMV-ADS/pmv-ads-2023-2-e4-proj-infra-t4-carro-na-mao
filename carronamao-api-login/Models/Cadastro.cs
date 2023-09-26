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
        public string Nome { get; set; } = null!;

        [BsonElement("DataNacimento")]
        public string DataNacimento { get; set; } = null!;

        [BsonElement("endereco")]
        public string endereco { get; set; } = null!;

        [BsonElement("cpf")]
        public string cpf { get; set; } = null!;

        [BsonElement("Telefone")]
        public string Telefone { get; set; } = null!;

        [BsonElement("email")]
        public string email { get; set; } = null!;

        [BsonElement("senha")]
        public string senha { get; set; } = null!;

        [BsonElement("restricoes")]
        public string restricoes { get; set; } = null!;

        [BsonElement("categoriaHabilitacao")]
        public string categoriaHabilitacao { get; set; } = null!;

        [BsonElement("usuarioAtivo")]
        public bool usuarioAtivo { get; set; }
    }
}
