﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace carro_na_mao_api.Models.Estoque
{
    public class Estoque
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id_estoque { get; set; }

        [BsonElement("modelo_veiculo")]
        public string? modelo_veiculo { get; set; }

        [BsonElement("marca_veiculo")]
        public string? marca_veiculo { get; set; }

        [BsonElement("cor_veiculo")]
        public string? cor_veiculo { get; set; } = null;

        [BsonElement("quantidade")]
        public int quantidade { get; set; }
    }
}
