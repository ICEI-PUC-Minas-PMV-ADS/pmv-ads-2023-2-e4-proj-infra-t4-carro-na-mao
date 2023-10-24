namespace carro_na_mao_api.Models.Avaliacao
{
    public class AvaliacaoDatabaseSettings
    {

        public string ConnectionString { get; set; } = null;
        
        public string DatabaseName { get; set; } = null;

        public string AvaliacaoCollectionName { get; set; } = null;
    }
}
