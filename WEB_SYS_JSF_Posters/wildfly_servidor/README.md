# Configurações do Wildfly 18.0.0

Modulo de conexão do banco de dados Mysql (modulos/com/mysql/main/mysql-connector-java-8.0.22.jar) já incluso no WildFly. Atenção módulo de conexão mysql versão 8.0.22, esse módulo funciona apenas no mysql server versão 8.0.22, caso utilize uma versão diferente adicionar novo módulo de conexão na versão equivalente ao mysql serve utilizador. O SGBD deve conter a seguinte conta com permissão GRANT ALL PRIVILEGES.

```sh
usuário: user
password: abcd1234
```

Deve-se criar um banco de dados com nome "hibernatedb".
Para mais informações consultar standalone.xml tag: security-domain name="red".

Link para download do Wildfly 18.0.0

https://drive.google.com/file/d/1lrFf4yHv-EmuSokL0fz9tBqmGABdKYYx/view

