# Plano de Testes de Software 
 ## FRONT END: MOBILE

### 09 - Notificação
   > Requisito Associado: RF-001 O sistema deve enviar notificações e lembretes aos clientes sobre datas de aluguel, devolução e pagamentos pendentes.

**9 - Recebimento de notificações push**
 - Objetivo do Teste: Verificar se o envio da Notificação push irá aparecer como alerta no dispositivo mobile.
 - Passos:     
    1) Acessar a aplicação em modo desenvolvimento, usando o EXPO GO
    2) Acessar a API de envio de notificações 'push', no endereço (https://app.nativenotify.com/)
    2) Fazer Login e acessar o a sessão App _Carro na mao_
    3) Clicar no símbolo de notificação (_Message icon_), escrever título e conteúdo da notificação e clicar em _Send Push Notification_
 - Critério de sucesso: Mensagem de alerta de 'Sucesso' exibida, a notificação 'push' aparecer na tela do dispositivo e na sessão de 'notificações enviadas' da API.


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

 **9 - Recebimento de notificações e-mail**
 - Objetivo do Teste: Verificar se a mensagem enviada pelo _front-end_ chega ao destinatário via e-mail. 
 - Passos: 
    1) Acessar a aplicação em modo desenvolvimento, no endereço local (http://localhost:3000/)
    2) Fazer Login ou cadastrar um usuário e acessar a sessão _Notificações_
    3) Digitar o tipo de mensagem desejada e clicar em enviar
 - Critério de Êxitos: A nova mensagem será enviada para a caixa do endereço de e-mail informado e deverá aparecer na sessão 'Emails' da API Resend.

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

