using MongoDB.Bson.Serialization.Attributes;

namespace carro_na_mao_api.Models.Multa
{
    public class Multa
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("Nome")]
        public string? Name { get; set; } = null;
    }
}
