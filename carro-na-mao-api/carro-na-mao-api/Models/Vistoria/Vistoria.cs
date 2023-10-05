using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Vistoria
{
    public class Vistoria
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id_vistoria { get; set; } = null;

        [BsonElement("id_veiculo")]
        public int id_veiculo { get; set; }

        [BsonElement("data")]
        public DateTime? data { get; set; } = null;

        [BsonElement("tipo")]
        public int tipo { get; set; }

        [BsonElement("descricao")]
        public int descricao { get; set; }

        [BsonElement("observacoes")]
        public int observacoes { get; set; }

        [BsonElement("cria_ordem_manut")]
        public bool cria_ordem_manut { get; set; }
    }
}
