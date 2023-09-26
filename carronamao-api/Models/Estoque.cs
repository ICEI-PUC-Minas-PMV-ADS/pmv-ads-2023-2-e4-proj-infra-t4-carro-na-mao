using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace carronamao_api.Models
{
    public class Estoque
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id_estoque { get; set; }

        [BsonElement("id_veiculo")]
        public int id_veiculo { get; set; }

        [BsonElement("cor_veiculo")]
        public string? cor_veiculo { get; set; } = null;

        [BsonElement("quantidade")]
        public int quantidade { get; set; }
    }
}
