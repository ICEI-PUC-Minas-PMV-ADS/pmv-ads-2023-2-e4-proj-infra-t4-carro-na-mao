using carro_na_mao_api.Models.Cadastro;
using carro_na_mao_api.Models.Categoria;
using carro_na_mao_api.Models.Estoque;
using carro_na_mao_api.Models.Locacoes;
using carro_na_mao_api.Models.Retirada;
using carro_na_mao_api.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<EstoqueDatabaseSettings>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));

builder.Services.AddSingleton<EstoqueService>();

builder.Services.Configure<CategoriaDatabaseSettings>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));

builder.Services.AddSingleton<CategoriaService>();

builder.Services.Configure<RetiradaDatabaseSettings>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));

builder.Services.AddSingleton<RetiradaService>();

builder.Services.Configure<CadastroDataBase>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));
builder.Services.AddSingleton<CadastroService>();

builder.Services.Configure<LocacaoDatabaseSettings>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));
builder.Services.AddSingleton<LocacaoService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
