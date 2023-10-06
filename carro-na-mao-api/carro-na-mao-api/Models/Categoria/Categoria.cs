using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Categoria
{
    public class Categoria
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id_categoria { get; set; }

        [BsonElement("desc_categoria")]
        public string desc_categoria { get; set; }

        [BsonElement("vl_categoria")]
        public int vl_categoria { get; set; }

        [BsonElement("ind_promocao")]
        public bool ind_promocao { get; set; }
    }
}
