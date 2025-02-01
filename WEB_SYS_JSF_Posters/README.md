# JPoster

Utilizando o Framework JSF foi desenvolvido um sistema de postagem de conteúdo. No sistema existem 3(três) níveis de acesso: usuário cadastrado, usuário cadastrado com permissão de editor, usuário cadastrado com permissão admin, onde:

- Usuário cadastrado pode visualizar posters e criar posters. Poster criado será enviado para revisão.
- Usuário cadastrado com permissão de editor, responsável por checar o poster criado, liberando ou devolvendo para correção.
- Usuário cadastrado com permissão admin, responsável por adicionar ou remover permissão.
- Obs: Um usuário pode ter varias permissões.

## Gerenciamento do Projeto e Bibliotecas Utilizadas

- O Projeto é gerenciado pelo Apache Maven.
- Informações do JavaServer Faces e Servidor do Sistema.
    - O Sistema roda sobre o servidor WildFly 18.0.0 (servidor incluso no projeto, consultar pasta para mais informações de configuração).
    - javax.faces(Mojarra) 2.4.0 para utilização do JSF. Implementação provida pelo servidor da aplicação WildFly.
    - Versão do Java 1.8.
    - Versão do Dynamic Web 3.1.
    - Versão do JSF 2.2.
- Estilos e Componentes de Interface Gráfica.
    - Utilizado GridLayout para definir o layout principal do sistema e Flexbox no alinhamento de alguns elementos. As classes CSS seguem a convenção de nomenclatura do BEM. Para divisão de layouts, componentes e módulos CSS foi utilizado arquitetura SMACSS. Observação o sistema não é responsivo.
    - PrimeFaces Versão (10.0.0) utilizando para componentes html de interface gráfica.
    - OmniFaces Versão (2.7.1) também uma biblioteca para componentes gráficos, entretanto foi utilizado para carregar imagens do banco de dados com a tag <o:graphicImage>.
- Controle de Acesso
    - Para autenticação e autorização foi utilizado Java Authentication and Authorization Service (JAAS), para visualizar configuração do servidor consultar pasta "wildfly_servidor".
- Persistência de dados
    - Para persistência dos dados foi utilizar MySql.
    - Para interação com o banco de dados foi utilizando o JPA (2.2) + Hibernate.
- Plugin MetaModel para gerar classes auxiliadoras na montagem de querys com Hibernate. Para gerar os Metamodels executar o comando "clean install" no maven. Por alguma razão se a dependência estiver habilitada o projeto não sobe, para contorna esse problema após gerar Metamodels desabilitar a dependência realizando o comentário.

##  Funcionalidades e Screens

**Criação de um Poster**
<p align="center">
    <img src="https://github.com/ejailes/Projetos_Livres/blob/master/WEB_SYS_JSF_Posters/gifs/g01.gif" width="560" height="250">
</p>

**Revisão de um Poster**
<p align="center">
    <img src="https://github.com/ejailes/Projetos_Livres/blob/master/WEB_SYS_JSF_Posters/gifs/g02.gif" width="560" height="250">
</p>

**Atribuição de Permissão e Exclusão de Usuário**
<p align="center">
    <img src="https://github.com/ejailes/Projetos_Livres/blob/master/WEB_SYS_JSF_Posters/gifs/g03.gif" width="560" height="250">
</p>

## Acessando Sistema

Route de acesso
```sh
http://localhost:8080/jposter/
```
Login do Usuário Admin criado automaticamente.

```sh
login: admin@gmail.com
password: abcd1234
```
