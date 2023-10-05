using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Notificacao
{
    public class Notificacao
    {
        [BsonId]
        public string? id_notificacao { get; set; }

        [BsonElement("Data")]
        public DateTime Data { get; set; }

        [BsonElement("Assunto")]
        public string? Assunto { get; set; }

        [BsonElement("Corpo Mensagem")]
        public string? Corpomensagem { get; set; }

    }
}
