using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Notificacao
{
    public class Notificacao
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_notificacao { get; set; }

        [BsonElement("Data")]
        public string? Data { get; set; } = null;

        [BsonElement("Assunto")]
        public int Assunto { get; set; }

        [BsonElement("Corpo Mensagem")]
        public int Corpomensagem { get; set; }

    }
}
