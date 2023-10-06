using System.ComponentModel.DataAnnotations;

namespace carro_na_mao_api.Models.Authenticate
{
    public class Authenticate
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string senha { get; set; }
    }
}
