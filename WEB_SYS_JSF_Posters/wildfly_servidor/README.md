# Configurações do Wildfly 18.0.0

Modulo do banco de dados Mysql já incluso no WildFly, o SGBD deve conter a seguinte conta com permissão para criação de databases e drop

```sh
usuário: user
password: abcd1234
```

Deve-se criar um banco de dados com nome "hibernatedb".
Para mais informações consultar standalone.xml tag: security-domain name="red".

