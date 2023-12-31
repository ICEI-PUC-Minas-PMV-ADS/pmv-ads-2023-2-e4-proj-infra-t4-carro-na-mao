# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

O software será desenvolvido baseado no modelo de arquitetura de sistemas distribuídos.

Em (COLOURIS, 2013) um sistema distribuído é definido “como aquele no qual os componentes de hardware ou software, localizados em computadores interligados em rede, comunicam-se e coordenam suas ações apenas enviando mensagens entre si”. 

Esses computadores podem estar em qualquer distância, separados ou não geograficamente (na "nuvem"), representados pela Figura 1 abaixo.
<br></br>

Figura 1 - Arquitetura de Software Distribuído:
<br></br>

![Arquitetura da Solução](img/arquitetura_v2.png)

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.


![Diagrama de Classes](img/DiagramaClasse02.png)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

![Modelo ER](img/modeloER.png)

## Projeto de Base de Dados

O projeto de base de dados corresponde à representação das entidades e relacionamentos identificados no Modelo ER, sem formato de tabelas, com colunas e chaves primárias/estranhas permitidas para representar corretamente as restrições de integridade.

![Projeto de Base de Dados](img/ModeloRelacional02.jpeg)

## Tecnologias Utilizadas

Para o desenvolvimento do sistema utilizaremos a linguagem C# com o Enty Framework, para a manipulação do banco de dados usaremos o MongoDB. Usaremos o visual studio 2022 para desenvolvimento da aplicação, já para o gerenciamento de código usamos o github.


**Principais Tecnologias**

**MongoDB**

MongoDB é um banco NoSQL baseado em documento sem transações e sem joins. De fácil instalação com consultas de sintaxe simples, permite ainda excelente escalabilidade.

**C Sharp**

O "C#", como é conhecido, é uma linguagem multiplataforma. Podendo ser utilizada para desenvolver para plataformas web, dispositivos móveis e aplicações desktop. Além de maior praticidade, tem excelente aderência com a teconologia de servidor em nuvem Mircrosoft Azure.

**React**

Os componentes podem ser compartilhados e reutilizados nas diferentes partes da aplicação, além de ser fácil de manutenção.

**Microsoft Azure**

O Microsoft Azure tem backup automatizado de dados e permite o armazenamento remoto de dados.
Além disso, faz conexão de programas, podendo ser locais ou em nuvem, dando flexibildiade ao projeto.


## Hospedagem

A hospedagem de sites é um serviço online que permite que o conteúdo do seu site fique acessível na internet. Por escolha da equipe de desenvolvimento do projeto carro na mão, decidimos armazenar todos os seus dados e arquivos na Vercel. 

A Vercel é uma plataforma voltada para a hospedagem de aplicações de uma forma bem simples e rápida. Ela é conhecida por ser a empresa criadora do framework Next JS, voltado para o React. Entretanto, também é possível realizar o deploy de aplicações Nuxt nesta plataforma.

Todas teconologias foram pensadas de forma a facilitar a expansão da aplicação à medida em que ela cresce, permitindo que as equipes de desenvolvimento trabalhem de forma mais eficiente e concomitante. Segue a baixo o link de acesso a plataforma com o projeto carro na mão hospedado e totalmente funcional:


* <a href="https://carronamao-three.vercel.app/">Site web: Carro na Mão - Locadora</a>


## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.
