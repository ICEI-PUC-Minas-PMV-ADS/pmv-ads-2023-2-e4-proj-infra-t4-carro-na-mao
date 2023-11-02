using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Avaliacao
{
    public class Avaliacao
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Observacoes")]
        public string? observaceo { get; set; } = null;

        [BsonElement("Nota")]
        public int nota { get; set; }

        [BsonElement("nome usuario")]
        public string? nomeUsaurio { get; set; } = null;

        [BsonElement("id_usuario")]
        public string id_usuario { get; set; } = null;


    }
}
