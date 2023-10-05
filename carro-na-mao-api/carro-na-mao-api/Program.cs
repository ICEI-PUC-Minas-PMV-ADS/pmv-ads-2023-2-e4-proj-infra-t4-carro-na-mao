using carro_na_mao_api.Models.Avaliacao;
using carro_na_mao_api.Models.Cadastro;
using carro_na_mao_api.Models.Categoria;
using carro_na_mao_api.Models.Estoque;
using carro_na_mao_api.Models.Locacoes;
using carro_na_mao_api.Models.Retirada;
using carro_na_mao_api.Models.Historico;
using carro_na_mao_api.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection.Metadata;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

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
builder.Services.AddSingleton<AvaliacaoService>();

builder.Services.Configure<LocacaoDatabaseSettings>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));
builder.Services.AddSingleton<LocacaoService>();

builder.Services.Configure<HistoricoDatabaseSettings>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));
builder.Services.AddSingleton<HistoricoService>();


builder.Services.AddControllers();

builder.Services.Configure<AvaliacaoDatabaseSettings>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));
builder.Services.AddSingleton<AvaliacaoService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    // Adding Jwt Bearer
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Ry74cBQva5dThwbwchR9jhbtRFnJxWSZ"))
        };
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "api-carro-na-mao", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
