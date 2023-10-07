using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace carro_na_mao_api.Models.Historico
{
    public class Historico
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_historico { get; set; }

        [BsonElement("Contrato")]
        public string? HistoricoContrato { get; set; }

        [BsonElement("Encerramento")]
        public string? Encerramento { get; set; }

        [BsonElement("Veiculo")]
        public string? Veiculo { get; set; }

        [BsonElement("Valores")]
        public int? Valores { get; set; }

        [BsonElement("Observacao")]
        public string? HistoricoObservacao { get; set; }

    }
}
