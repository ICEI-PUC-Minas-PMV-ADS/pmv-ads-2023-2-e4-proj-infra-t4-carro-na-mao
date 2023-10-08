using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Multa
{
    public class Multa
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_multa { get; set; }
        [BsonElement("Name")]
        public string? Name { get; set; } = null!;
        [BsonElement("Detalhe")]
        public string? Detalhe { get; set; } = null!;
        [BsonElement("Contrato")]
        public int? Contrato { get; set; } = null!;
        [BsonElement("Recurso")]
        public string? Recurso { get; set; } = null!;
    }
}
