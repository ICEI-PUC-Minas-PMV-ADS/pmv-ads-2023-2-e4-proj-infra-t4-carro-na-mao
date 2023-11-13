namespace carro_na_mao_api.Models.Manutencao
{
    public class ManutencaoDatabaseSettings
    {
        public string ConnectionString { get; set; } = null;
        public string DatabaseName { get; set; } = null;
        public string ManutencaoCollectionName { get; set; } = null;
    }
}
