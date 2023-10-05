using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Vistoria
{
    public class Vistoria
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id_vistoria { get; set; }

        [BsonElement("id_veiculo")]
        public int? id_veiculo { get; set; } = null;

<<<<<<< Updated upstream
        [BsonElement("data")]
        public string? data { get; set; } = null;
=======
        [BsonElement("data_vistoria")]
        public DateTime? data_vistoria { get; set; } = null;
>>>>>>> Stashed changes

        [BsonElement("tipo")]
        public int? tipo { get; set; } = null;

        [BsonElement("descricao")]
        public string? descricao { get; set; } = null;

        [BsonElement("observacoes")]
        public string? observacoes { get; set; } = null;

        [BsonElement("cria_ordem_manut")]
<<<<<<< Updated upstream
        public int cria_ordem_manut { get; set; }
=======
        public bool? cria_ordem_manut { get; set; } = null;
>>>>>>> Stashed changes
    }
}
