using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Reservas
{
    public class Locacao
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id_locacao { get; set; }

        [BsonElement("id_local")]
        public int id_local { get; set; }

        [BsonElement("id_categoria")]
        public string id_categoria { get; set; }

        [BsonElement("modelo_veiculo")]
        public string modelo_veiculo { get; set; }

        [BsonElement("hora_retirada")]
        public string hora_retirada { get; set; }

        [BsonElement("hora_entrega")]
        public string hora_entrega { get; set;}

        [BsonElement("vl_categoria")]
        public int vl_categoria { get; set; }

        [BsonElement("custos_ad")]
        public int custos_ad { get; set; }

        [BsonElement("data_retirada")]
        public string data_retirada { get; set; }

        [BsonElement("data_entrega")]
        public string data_entrega { get; set; }


    }
}
