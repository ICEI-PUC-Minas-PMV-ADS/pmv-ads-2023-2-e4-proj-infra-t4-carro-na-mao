
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

## Relação de Ambientes de Trabalho

Para que tenhamos uma boa produtividade no desenvolvimento do nosso software usaremos as seguintes ferramentas:

|Ambiente                        | Plataforma            |Link de Acesso                                           |
|--------------------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Repositório do Código Fonte      |Git Hub                |https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t4-carro-na-mao|
|Gerenciamento de Projeto          |Trello             |https://trello.com/b/TCtybrpI/projeto-eixo-4 |

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: Versão estável já testada do software;
- `dev`: Versão de desenvolvimento do software;
- `feat/(requisito) -> branch de cada requisito individual`: Crianção de novas funcionalidades;
- `fix/(bug) -> branch de cada bug fix individual` : Correções de bugs.


Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `documentation`: Melhorias ou acréscimos à documentação;
- `bug`: Uma funcionalidade encontra-se com problemas;
- `enhancement`: Uma funcionalidade precisa ser melhorada;
- `feature`: Uma nova funcionalidade precisa ser introduzida.

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gerência de tags, merges, commits e branchs é realizada. Discuta como a gerência de issues foi realizada.


## Gerenciamento de Projeto

### Divisão de Papéis

A equipe utiliza metodologias ágeis, tendo escolhido o Scrum como base para definição do processo de desenvolvimento. A equipe está organizada da seguinte maneira:

 - Scrum Master: Roger Bastos;
 - Product Owner: Pedro Assis;
 - Equipe de Desenvolvimento: Matheus Sampaio, Matheus Ferreira, Daniel de Souza, Maykon Edésio, Pedro Assis, Roger Bastos, Vitor Hugo.

Para organização e distribuição de tarefas do projeto, utilizaremos o Trello estruturado da seguinte forma:
 - Backlog: Parte onde está todas as tarefas que será desenvolvidas no projeto. Caso apareça nova atividades será redirecionada nessa parte.
 - A Fazer (Sprint Backlog): Sprint atual de trabalho.
 - Em Andamento: Tarefas que foram iniciadas.
 - Concluido: Tarefa que foram finalizadas.

A seguir uma representação de como se encontra o quadro:

![trello](img/trello%20proj.png)

### Processo

Para a gerenciar os processos e automatizar os fluxos de tarefas do projeto, o time My Finances utiliza-se o work board ou work space, ferramenta visual do Trello, com estrutura simples, flexível e poderosa para o desenvolvimento com os seguintes status:

- **Documentation:** sequência das tarefas referentes à documentação de contexto que serão trabalhadas pela equipe, conforme cronograma do curso de Análise Desenvolvimento de Sistemas da Pontifícia Universidade Católica de Minas Gerais (PUC Minas).

- **Useful Links:** Nesse cartão tem os links dos templetes de consulta para auxilio do processo do projeto.

- **Backlog:** Nessa coluna, encontra-se todas as pendências das etapas da entrega a ser processadas. 

- **To Do:** Nessa coluna, estão alocadas as tarefas estabelecidas para a Sprint atual e que ainda não foram iniciadas, assim como os membros da equipe responsáveis por cada item.

- **In Progress:** Tarefas que já foram iniciadas mas ainda não finalizadas, são acompanhadas rotineiramente seguindo os ritos da metodologia ágil.

- **Test Phase:** Tarefas iniciadas e finalizadas. Etapa de extrema importância no processo de desenvolvimento de software, visam validar se a aplicação está funcionando corretamente e se atende aos requisitos especificados.

- **Concluded:** Tarefas concluídas e aprovadas no teste de qualidade.



### Ferramentas

A seguir temos as ferramentas empregadas no projeto:

- Ferramentas de comunicação: Para a comunicação utilizaremos o Microsoft Teams para as reuiniões com o professor orientador é, utilizaremos o discord para reuniões separada.

- Ferramentas de banco de dados: Para o banco de dados pretedemos utilizar o mongoDB, pois e uma ferramenta que nos foi apresentado nos microfundamentos.

- Ferramentas de controle de versão: Para o gerenciamento de versão do código, utilizaremos o Git com o suporte do GitHub hospedando as versões.

- Ferramentas de gerenciamento de projeto: Para gerenciar o projeto, utilizaremos o trello com o quadro Kabam.

