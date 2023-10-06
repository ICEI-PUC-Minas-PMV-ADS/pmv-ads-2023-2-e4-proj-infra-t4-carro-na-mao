namespace carro_na_mao_api.Models.Manutencao
{
    public class Manutencao
    {
        public string? id_manutencao { get; set; } = null;

        public int? id_veiculo { get; set; }  
        
        public DateTime? data_inicio { get; set; } = null;

        public string? tipo { get; set; } = null;

        public string? descricao { get; set; } = null;

        public string? valor_nf { get; set; } = null;

        public string? hora_oficina { get; set; } = null;

        public string? previsao_termino { get; set; } = null;
        public string? id_vistoria { get; set; } = null;




    }
}
