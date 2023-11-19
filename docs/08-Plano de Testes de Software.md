# Plano de Testes de Software 

 ## FRONT END: MOBILE
 ### 1 - Login/Cadastro
  
**1.1 - Verificar se o cadastro barra email já cadastrado na plataforma**
   - Obejetivo: Evitar usuario com o mesmo login.
   - Passos: Acessar a pagina de cadastro, preenche a fixa
   - Criterio: Caso o email já estejá cadastrado, um alerta será emetido
**1.2 - Verificar se cadastro está sendo realizado sem nenhum problema**
   - Obejetivo: Ter certeza que todos os dados estão sendo enviado de maneira corrreta
   - Passos: Acessar a pagina de cadastro, preenche a fixa
   - Criterio: Caso estejá tudo certo, um alerta avisando que foi cadastrado ira surgi
**1.3 - Verificar se o  sistema deixa somente usuario cadastrados entrar na plataforma**
   - Obejetivo: Verificar se o sistema deixa somente usuario cadastrados entrar
   - Passos: Na tela de login, digitar um usuario aleatoria
   - Criterio: Caso o usuario n exista  o sistema deve barrar
 ### 5 - Avaliação 
 **5.1 - Verificar se as avaliações estão sendo recuperadas do banco de dados de maneira correta**
   - Obejetivo:Verificar se o sistema está mostrando as avaliações dos serviço com o nome e data de quem avaliaou 
   - Passos: acessar a pagina de avaliações
   - Criterio: As avaliações aparecer
 **5.2- Verficar se o campo de registro de novas avaliações aparece de forma correta**
   - Obejetivo: Verificar se o registro funciona 
   - Passos: Acessar a pagina de avaliaçõe, aperta no botão de mais e adicionar
   - Criterio: Mensagem de sucesso aparecer
 ### 10 - Perfil
 **10.1 - Verificar se as informções do usaurio aparece de acordo com o usuario logado**
   - Obejetivo: Verificar se o sistema so mostra dados do usaurio logado
   - Passos: Acessar a pagina de perfil
   - Criterio: Aparecer somente as informações do  usuario
 **10.2 - Verificar se se o usuario consegue editar sua informações**
   - Obejetivo: Verificar se o metodo put da API funcina de maneira adequada
   - Passos: Acessar a pagina de perfil, clicar no botão de editar e depois confirmar as alteraçãoes
   - Criterio: Mensangem de sucesso aparecer
 **10.3 -  Verificar se o usuario consegue apagar sua conta**
   - Obejetivo: Verificar se o usaurio consegue deletar a sua conta
   - Passos: Acessar a pagina do perfil, clicar na lixiera e depois excluir
   - Criterio: Usuario redirecionado para tela de login

 ## FRONT END: WEB
 ### 1 - Login/Cadastro

 **1.1 - Verificar se o login barra campos em branco**
    - Objetivo do Teste: Verificar se o sistema verifica os dados de login 
    - Passos: Acessar a aplicação e tentar entrar com os campos em branco.
    - Critério: Barramento da entrada na aplicação.

 **1.2 - Verificar se o login barra usuarios não cadastrados**
    - Objetivo do Teste: Verificar se o sistema só entra com pessoas autorizadas. 
    - Passos: Entrar na aplicação e digitar um usuario aleatorio.
    - Critério: Alert avisando que o usaurio não está cadastrado na plataforma.

 **1.3- Verificar se o cadastro barra campos em branco**
  - Objetivo do Teste: Verificar se todos os campos estão preenchidos. 
  - Passos: Acessar o a aplicação e deixar algum campo em branco.
  - Critério: Alert avisando o usuario para preencher todos os campos.

 ### 5- Avaliação
 **5.1 - Registro das Informações**
 - Objetivo do Teste: Verificar se todas as informações do usuário registram no front end web. 
 - Passos: Acessar o http://localhost:3000/Avaliacoes  e incerir os dados.
 - Critério: Vizualizar todas as informações em todos os campos.

**5.2 - Front End Web em Funcionamento**

 - Objetivo do Teste: Verificar se as informações foram enviadas com sucesso, caso contrario o sistema apontará o que está faltando preencher.
 - Passos: Acessar o http://localhost:3000/Avaliacoes , preencher os campos e enviar dados.
 - Critério de sucesso: Retorno exeto de conclusão.

**5.3 - Excluindo Informações Registradas**
 - Objetivo do Teste: Verificar se o metodo delete consegue excluir de maneira correta o registro das informações inceridas nós campos.
 - Passos: Acessar o http://localhost:3000/Avaliacoes , após preencher os campos e usar a tecla excluir.
 - Critério de sucesso: Excluir todos os dados.

 ### 6 - Locação
 **6.1 - Registro da Reserva**
  - Objetivo do Teste: Verificar se todas as informações do usuário registram no sistema.
 - Passos: Acessar o http://localhost:3000/Locacao e inserir os dados.
 - Critério: Preencher todos os dados necessários para a inclusão da reserva.

**6.2 - Front End Web em Funcionamento**

 - Objetivo do Teste: Verificar se as informações foram enviadas com sucesso, caso contrario o sistema retornará um erro para que todos os dados sejam inseridos corretamente.
 - Passos: Acessar o http://localhost:3000/Locacao , preencher os campos e enviar dados.
 - Critério de sucesso: Retorno de inclusão.

 **6.3 - Excluindo Informações Registradas**
 - Objetivo do Teste: Verificar se o metodo delete consegue excluir de maneira correta o registro das informações inseridas nos campos.
 - Passos: Acessar o http://localhost:3000/Locacao , após preencher os campos e usar a tecla excluir.
 - Critério de sucesso: Excluir todos os dados.

 ### 7- Vistoria
 **7.1 - Registro da vistoria**
 - Objetivo do Teste: Verificar se todas as informações da vistoria registram no front end web. 
 - Passos: Acessar o http://localhost:3000/vistoria  e inserir os dados.
 - Critério: Vizualizar todas as informações em todos os campos.

**7.2 - Front End Web em Funcionamento**

 - Objetivo do Teste: Verificar se as informações foram enviadas com sucesso, caso contrario o sistema apontará o que está faltando preencher.
 - Passos: Acessar o http://localhost:3000/vistoria , preencher os campos e enviar dados.
 - Critério de sucesso: Retorno exito de conclusão.

**7.3 - Excluindo Informações Registradas**
 - Objetivo do Teste: Verificar se o metodo delete consegue excluir de maneira correta o registro das informações inceridas nós campos.
 - Passos: Acessar o http://localhost:3000/vistoria , após preencher os campos e usar a tecla excluir.
 - Critério de sucesso: Excluir todos os dados.

   ### 09 - Notificação
   > Requisito Associado: RF-001 O sistema deve enviar notificações e lembretes aos clientes sobre datas de aluguel, devolução e pagamentos pendentes.

 **9.1 - Recebimento de notificações**
 - Objetivo do Teste: Verificar se a mensagem enviada pelo _front-end_ chegam ao destinatário. 
 - Passos: 
    1) Acessar a aplicação em modo desenvolvimento, no endereço local (http://localhost:3000/)
    2) Fazer Login ou cadastrar um usuário e acessar a sessão _Notificações_
    3) Digitar a mensagem e clicar em enviar
 - Critério de Êxitos: Um alerta de nova mensagem, no ícone de notificação (_Bell Icon_).

**9.2 - Leitura de notificações**
 - Objetivo do Teste: Verificar se após a abertura da Notificação o alerta de nova mensagem irá "desligar".
 - Passos:     
    1) Acessar a aplicação em modo desenvolvimento, no endereço local (http://localhost:3000/)
    2) Fazer Login ou cadastrar um usuário e acessar a sessão _Notificações_
    3) Clicar no símbolo de notificação (_Bell Icon_), clicar na mensagem marcada como nova para fazer a leitura.
 - Critério de sucesso: O ícone de alerta de nova mensagem, no _Bell Icon_ deverá alterar para "mensagem lida".

**9.3 - Apagar as notificações**
 - Objetivo do Teste: Verificar se as notificações serão apagadas após a utilização da opção "Remover Mensagem".
 - Passos:     
    1) Acessar a aplicação em modo desenvolvimento, no endereço local (http://localhost:3000/)
    2) Fazer Login ou cadastrar um usuário e acessar a sessão _Notificações_
    3) Clicar no símbolo de notificação (_Bell Icon_), clicar na mensagem, selecionar "Opções" através do menu contexto "..." e selecionar a opção "Remover Mensagem".
 - Critério de sucesso: A mensagem deverá ser apagada e não ser mais listada dentro das Notificações. Caso todas as mensagem sejam apagadas, uma tela com a informação "Nenhuma mensagem nova" deverá ser exibida.


##
## API
### 1- Cadastro 
 **1.1 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta
 - Passos:Acessar o swagger, acessar o try out e preencher os campos solicitados 
 - Critério de sucesso: Retorno do código 200

 **1.2 - Delete**

 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro de usuarios passado como parametro.
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso:Retorno do código 200

**1.3 - Update**
 
 - Objetivo do Teste: Verificar se o metodo update da aplicação consergue atualizar de forma correta as informação de usuarios passado como parametro 
 - Passos: Acessar o swagger, passar um id como parametro e os campos que devem ser modificados. 
 - Critério de sucesso: Retorno do código 200.

**1.4 - Get**
 - Objetivo do Teste: Verificar se o metodo get e consegue puxar informações de usuarios registradas no banco de dados. 
 - Passos: Acessar o swagger e executar o try out.
 - Critério: Retorno do código 200.

#### 2 - Estoque
**2.1 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta.
 - Passos:Acessar o swagger, acessar o try out e preencher os campos solicitados .
 - Critério de sucesso: Retorno do código 200.


**2.2 - Delete**
 
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro de estoque passado como parametro.
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso:Retorno do código 200.

**2.3 - Update**

 - Objetivo do Teste: Verificar se o metodo update da aplicação consergue atualizar de forma correta as informação de estoque passado como parametro 
 - Passos: Acessar o swagger, passar um id como parametro e os campos que devem ser modificados. 
 - Critério de sucesso: Retorno do código 200.

**2.4 - Get**
 - Objetivo do Teste: Verificar se o metodo get da API está retornando todos os registro de estoque do banco de dados.
 - Passos: Acessar o swagger e executar o try out.
 - Critério de sucesso:Retorno do código 200.

### 3- Retirada
**3.1 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta.
 - Passos: Acessar o swagger, acessar o try out e preencher os campos solicitados
 - Critério de sucesso: Retorno do código 200.

**3.2 - Delete**
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro de retirada passado como parametro.
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso: Retorno do código 200.

**3.3 - Get**
 - Objetivo do Teste: Verificar se o metodo get da API retorna todos os registro de retiradas que está presente em nosso banco de dados.
 - Passos: Acessar o swagger e executar o try out.
 - Critério de sucessp: Retorno do código 200.

 ### 4- Categoria
**4.1 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta.
 - Passos: Acessar o swagger, acessar o try out e preencher os campos solicitados
 - Critério de sucesso: Retorno do código 200.

**4.2 - Delete**
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro das categorias passadas como parametro.
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso: Retorno do código 200.

 **4.3 - Update**

 - Objetivo do Teste: Verificar se o metodo update da aplicação consergue atualizar de forma correta as informação de categoria passado como parametro 
 - Passos: Acessar o swagger, passar um id como parametro e os campos que devem ser modificados. 
 - Critério de sucesso: Retorno do código 200.

**4.4 - Get**
 - Objetivo do Teste: Verificar se o metodo get da API retorna todos os registro de categorias que está presente em nosso banco de dados.
 - Passos: Acessar o swagger e executar o try out.
 - Critério de sucessp: Retorno do código 200.

 ### 5- Avaliação
 **5.1 - Get**
 - Objetivo do Teste: Verificar se o metodo get e consegue puxar informações de usuarios registradas no banco de dados. 
 - Passos: Acessar o swagger e executar o try out.
 - Critério: Retorno do código 200.

**5.2 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta.
 - Passos: Acessar o swagger, acessar o try out e preencher os campos solicitados
 - Critério de sucesso: Retorno do código 200.

**5.3 - Delete**
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro das categorias passadas como parametro.
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso: Retorno do código 200.

 **5.4 - Update**

 - Objetivo do Teste: Verificar se o metodo update da aplicação consergue atualizar de forma correta as informação de categoria passado como parametro 
 - Passos: Acessar o swagger, passar um id como parametro e os campos que devem ser modificados. 
 - Critério de sucesso: Retorno do código 200.
   
 ### 6- Locação
**6.1 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta.
 - Passos: Acessar o swagger, acessar o try out e preencher os campos solicitados
 - Critério de sucesso: Retorno do código 200.

**6.2 - Delete**
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro de retirada passado como parametro.
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso: Retorno do código 200.

**6.3 - Get**
 - Objetivo do Teste: Verificar se o metodo get da API retorna todos os registro de retiradas que está presente em nosso banco de dados.
 - Passos: Acessar o swagger e executar o try out.
 - Critério de sucessp: Retorno do código 200.

 ### 7- Vistoria
**7.1 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta.
 - Passos: Acessar o swagger, acessar o try out e preencher os campos solicitados
 - Critério de sucesso: Retorno do código 200.

**7.2 - Delete**
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro das vistorias passadas como parametro.
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso: Retorno do código 200.

 **7.3 - Update**

 - Objetivo do Teste: Verificar se o metodo update da aplicação consergue atualizar de forma correta as informação de vistoria passado como parametro 
 - Passos: Acessar o swagger, passar um id como parametro e os campos que devem ser modificados. 
 - Critério de sucesso: Retorno do código 200.

**7.4 - Get**
 - Objetivo do Teste: Verificar se o metodo get da API retorna todos os registro de vistorias que está presente em nosso banco de dados.
 - Passos: Acessar o swagger e executar o try out.
 - Critério de sucessp: Retorno do código 200.

 ### 8- Manutenção
**8.1 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta.
 - Passos: Acessar o swagger, acessar o try out e preencher os campos solicitados
 - Critério de sucesso: Retorno do código 200.

**8.2 - Delete**
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro das manutenções passadas como parametro.
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso: Retorno do código 200.

 **8.3 - Update**

 - Objetivo do Teste: Verificar se o metodo update da aplicação consergue atualizar de forma correta as informação de manutenção passado como parametro 
 - Passos: Acessar o swagger, passar um id como parametro e os campos que devem ser modificados. 
 - Critério de sucesso: Retorno do código 200.

**8.4 - Get**
 - Objetivo do Teste: Verificar se o metodo get da API retorna todos os registro de manutenções que está presente em nosso banco de dados.
 - Passos: Acessar o swagger e executar o try out.
 - Critério de sucessp: Retorno do código 200.

  ### 9- Notificação

 **9.1 - Get**
 - Objetivo do Teste: Verificar se o metodo get e consegue puxar informações das notificações enviadas no banco de dados. 
 - Passos: Acessar o swagger e executar o try out.
 - Critério: Retorno do código 200.

**9.2 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta.
 - Passos: Acessar o swagger, acessar o try out e preencher os campos solicitados
 - Critério de sucesso: Retorno do código 200.

**9.3 - Delete**

  - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta o registro das notificacões existentes;
 - Passos: Acessar o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso: Retorno do código 200.

