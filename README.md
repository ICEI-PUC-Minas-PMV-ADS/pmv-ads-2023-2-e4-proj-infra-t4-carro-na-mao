# CARRO NA MÃO

![Logo](/docs/img/Logo.jpeg)

`ANÁLISE E DESENVOLVIMENTO DE SISTEMAS`

`Projeto: Desenvolvimento de uma Aplicação Distribuída`

`Quarto semestre - Eixo 4`

O Carro na Mão é um aplicativo inovador que foi projetado para simplificar e agilizar o processo de locação de veículos. Com uma interface intuitiva e facilitada, o aplicativo oferece uma experiência agradável e conveniente para locatários e locadoras, tornando a locação e reserva de veículos mais simples, e descomplicada.

## Integrantes

* Daniel de Souza Marcolino
* Matheus Ferreira Pires
* Matheus Lemos Sampaio
* Maykon Edésio Rosa
* Pedro Assis Silva de Almeida
* Roger Bastos Mendes
* Vitor Hugo Silva Ribeiro

## Orientador

* Pedro Alves de Oliveira

## Instruções de utilização

Abaixo, segue instruções para rodar o projeto localmente e na nuvem. Após escolher uma das opções, siga para o passo de autenticação.

### Rodar na nuvem
Para utilizar os recursos da API pela nuvem, basta acessar o link abaixo:

https://api-carronamao.azurewebsites.net/Swagger/index.html

Após acessar, basta seguir os passos da instrução de autenticação.

### Rodar localmente
Para rodar localmente, vamos seguir os seguintes passos:

 - Caso não tenha o Visual Studio Commuity 2022 instalado, realize o download e instalação do mesmo.
 - Fazer o download do arquivo do projeto (ZIP) ou clone do projeto no GitHub;
 - Abrir o arquivo "carro-na-mao-api.sln" no Visual Studio (O mesmo está presente na pasta carro-na-ma-api);
 - Execute o código no Visual Studio, assim irá abrir uma janela em seu browser no endereço https://localhost:7112/swagger/index.html, o qual será exibido a interface do Swagger;
 - Agora, siga os passos da instrução de autenticação.
 
 ### Autenticação
 - Vá em Cadastro, e selecione a opção POST da rota "api/Cadastro/authenticate", assim como mostra a imagem abaixo:
 ![autenticacao](/docs/img/swagger-autenticacao.png)
 - Ao acessar o campo informado, clique no botão "Try it out" e no campo "nome" e "senha", insira adm e 123 respectivamente e clique no botão "Execute";
 - No **Response Body**, copie o código que está em frente ao "jwtToken";
 - Agora clique no ícone do cadeado em frente as rotas da API ou no botão verde "Authorize" e inseira o código salvo anteriormente no campo apresentado;
 - Clique em "Authorize" e assim será possível realizar consultas nas rotas da API.


# Documentação

<ol>
<li><a href="docs/01-Documentação de Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/02-Especificação do Projeto.md"> Especificação do Projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Projeto de Interface.md"> Projeto de Interface</a></li>
<li><a href="docs/05-Arquitetura da Solução.md"> Arquitetura da Solução</a></li>
<li><a href="docs/06-Template Padrão da Aplicação.md"> Template Padrão da Aplicação</a></li>
<li><a href="docs/07-Programação de Funcionalidades.md"> Programação de Funcionalidades</a></li>
<li><a href="docs/08-Plano de Testes de Software.md"> Plano de Testes de Software</a></li>
<li><a href="docs/09-Registro de Testes de Software.md"> Registro de Testes de Software</a></li>
<li><a href="docs/10-Plano de Testes de Usabilidade.md"> Plano de Testes de Usabilidade</a></li>
<li><a href="docs/11-Registro de Testes de Usabilidade.md"> Registro de Testes de Usabilidade</a></li>
<li><a href="docs/12-Apresentação do Projeto.md"> Apresentação do Projeto</a></li>
<li><a href="docs/13-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>
