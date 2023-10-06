namespace carro_na_mao_api.Models.Estoque
{
    public class EstoqueDatabaseSettings
    {
        public string ConnectionString { get; set; } = null;
        public string DatabaseName { get; set; } = null;
        public string EstoqueCollectionName { get; set; } = null;
    }
}
