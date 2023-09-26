using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carronamao_api.Models
{
    public class Retirada
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id_retirada { get; set; }

        [BsonElement("id_locacao")]
        public string id_locacao { get; set; }

        [BsonElement("id_veiculo")]
        public string id_veiculo { get; set; }

        [BsonElement("id_local")]
        public string id_local { get; set; }

        [BsonElement("ind_retirado")]
        public bool ind_retirado { get; set; }
    }
}
