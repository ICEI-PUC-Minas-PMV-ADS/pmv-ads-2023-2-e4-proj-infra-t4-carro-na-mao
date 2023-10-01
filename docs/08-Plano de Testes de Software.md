# Plano de Testes de Software
## API
### 1- Cadastro 
 **1.1 - Create**

 - Objetivo do Teste: Verificar se o metodo create da API está funcionando de forma correta
 - Passos:Acessaer o swagger, acessar o try out e preencher os campos solicitados 
 - Critério de sucesso: Retorno do código 200

 **1.2 - Delete**

 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta a registor de usuarios passado como parametro.
 - Passos: Acessaer o swagger, acessar o try out do metodo delete e passar um id com parametro.
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
 - Passos:Acessaer o swagger, acessar o try out e preencher os campos solicitados .
 - Critério de sucesso: Retorno do código 200.


**2.2 - Delete**
 
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta a registor de estoque passado como parametro.
 - Passos: Acessaer o swagger, acessar o try out do metodo delete e passar um id com parametro.
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
 - Passos: Acessaer o swagger, acessar o try out e preencher os campos solicitados
 - Critério de sucesso: Retorno do código 200.

**3.2 - Delete**
 - Objetivo do Teste: Verificar se o metodo delete da API consegue excluir de maneira correta a registor de retirada passado como parametro.
 - Passos: Acessaer o swagger, acessar o try out do metodo delete e passar um id com parametro.
 - Critério de sucesso: Retorno do cóidigo 200.

**3.3 - Update**
 
 - Objetivo do Teste: Verificar se o metodo update da API consegue atualizar os dados da retirada com sucesso.
 - Passos: Passar o Id do registro de retirada e mudar os campois necessarios.
 - Critério de sucesso: Retorno do código 200.

**3.4 - Get**
 - Objetivo do Teste: Verificar se o metodo get da API retorna todos os registro de retiradas que está presente em nosso banco de dados.
 - Passos: Acessar o swagger e executar o try out.
 - Critério de sucessp: Retorno do código 200.