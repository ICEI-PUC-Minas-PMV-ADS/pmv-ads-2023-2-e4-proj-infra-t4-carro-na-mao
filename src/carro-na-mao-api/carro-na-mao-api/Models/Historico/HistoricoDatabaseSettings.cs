namespace carro_na_mao_api.Models.Historico
{
    public class HistoricoDatabaseSettings
    {
        public string ConnectionString { get; set; } = null;
        public string DatabaseName { get; set; } = null;
        public string HistoricoCollectionName { get; set; } = null;
    }
}
