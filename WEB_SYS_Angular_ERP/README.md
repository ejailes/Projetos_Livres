# Angular ERP

Utilizando o Framework Angular foi desenvolvido um sistema de ERP (Planejamento de Recursos Empresariais) simples. O sistema oferece: cadastro da Empresa(s), Clientes, Conta(s) Bancaria(s) e Lançamentos.

- Usuário deve se cadastrar para utilizar o sistema.
- Usuário cadastrado pode cadastrar várias Empresas, Clientes, Contas e Lançamentos. O acesso as empresas estão restritas ao usuário que cadastra, logo é um sistema um(Usuário) para muitas(Empresas).

## Gerenciamento do Projeto e Bibliotecas Utilizadas

- O Projeto é gerenciado pelo NPM versão 6.14.8.
    - Angular: 14.3.0
    - Angular CLI: 14.2.13
    - Node: 14.15.0
    - TypeScript                      4.6.4
- Estilos e Componentes de Interface Gráfica.
    - Utilizando ngx-bootstrap para estilizar componentes em tempo de execução, exemplo: utilizado na class component ConfirmWindowComponent.
    - Utilizando ngx-mask para aplicação de máscaras em inputs.
    - Utilizando bootstrap e bootstrap-icons para estilizar componentes de interface.
- Persistência de dados.
    - Para persistência dos dados foi utilizado LocalStorage.

## Arquitetura do Sistema

A nível de conhecimento foi escolhida a arquitetura limpa para estruturação do sistema. Essa arquitetura tem o objetivo de promover a implementação de sistemas que favorecem reusabilidade de código, coesão, independência de tecnologia e testabilidade. 
<p align="center">
    <img src="https://github.com/ejailes/Projetos_Livres/blob/master/WEB_SYS_Angular_ERP/img/diagrama_circular.png" width="620" height="500">
</p>

**Camada Externa** – Abriga nossos frameworks e tecnologias, como banco de dados, interfaces gráficas, serviços de mensageria, entre outros, ela representa tudo o que está fora do núcleo central da aplicação. Além disso, é nesta camada que se encontram os **Adapted (Adaptados)**, que são implementações de **Interface Adapter (Adaptadores)** da camada adjacente ou interfaces definidas nas camadas mais internas. Essas implementações podem ser facilmente substituídas ou modificadas sem impactar a lógica central do sistema. Vale destacar que nessa camada no **componente Adapted (Adaptados)** figura logo abaixo, o sistema externo Angular ERP implementa interfaces (I/Os, Conversores, Repositórios, Fábricas) que foram específicas nas camadas mais internas.

**Camada Interface Adapter** – Abriga as Interfaces Adaptadoras, atuando como intermediária na comunicação com sistema externos. **A camada Interface Adapter** não deve conter lógica de negócio e deve ser agnóstica em relação à tecnologia. Seu único papel é garantir que a camada externa possa se comunicar de forma consistente e organizada com os **Casos de Uso(Services)** ou outras entidades, dessa forma ela adapta as requisições externas de forma que possam ser compreendidas pelas camadas internas, e também adapta as respostas internas para formatos que a camada externa consiga processar. No sistema Angular ERP, essa camada utiliza classes controladoras (Controllers) para agrupar e gerenciar os **Casos de Uso (Services)** de forma coesa, além de fornecer **Interface Adapter como RepositoryFactory e ConverterFactory**.

**Camada Casos de Uso** – Responsável por orquestrar as operações específicas que o sistema deve realizar para atender aos requisitos de negócio. Ela contém a lógica que define como as entidades do domínio devem interagir para resolver um problema específico ou executar uma funcionalidade solicitada. Essa camada abriga os **Casos de Uso (Services), Interfaces de I/0 (Entrada/Saída), Repositórios e Conversores**. Os Casos de Uso descrevem os passos para realizar uma tarefa, como criar um pedido, processar um pagamento ou gerar um relatório. **Eles contêm especificações de regras de negócio**, garantindo que essas regras sejam aplicadas corretamente. Os Casos de Uso interagem com as **Interfaces de Repositórios, Interfaces de I/O e Interfaces de Conversores que são implementadas nos Adapted (Adaptados) da camada externa**, utilizando inversão de dependência, dessa forma o sistema se mantém desacoplado de detalhes tecnológicos. O isolamento de detalhes de implementação técnica, permite que as operações sejam definidas de maneira clara e coesa, sem preocupação com a forma de como os dados são armazenados ou apresentados. Através da inversão de dependência, é possível conectar tecnologias externas a esta camada, sem a quebra do fluxo de dependência entre as camadas. O coração da Arquitetura Limpa reside no princípio da inversão de dependência, o mesmo utilizado na Arquiteta de Ports and Adapters.

**Camada Entities** – É o núcleo central do sistema, onde residem as regras de negócio(validações) mais fundamentais e as estruturas de dados essenciais(entidades). Esta é mais uma camada independente de qualquer tecnologia, sendo a parte mais estável da aplicação. Por exemplo, em um sistema de comércio eletrônico, as entidades podem incluir classes como “Cliente”, “Pedido”, “Produto”, etc. **As entidades são utilizadas pelos casos de uso**, o que significa que elas não sabem como serão usadas ou quais tecnologias estarão presentes.

**Diagrama de Dependência da Aplicação**
<p align="center">
    <img src="https://github.com/ejailes/Projetos_Livres/blob/master/WEB_SYS_Angular_ERP/img/diagrama_dep.jpg" width="660" height="500">
</p>

Nas camadas amarela, vermelha e verde se encontra o **domínio** da aplicação, sem nem um tipo de “tecnologia externa” a não ser os próprios recursos da linguagem utilizada no caso TypeScript. Na camada azul é onde fica o Framework Angular, tecnologias externas (banco de dados, bibliotecas, etc) e implementações dos **Adapted (Adaptados)** que foram específicados nas camadas mais internas. 

## Funcionalidades e Screens
**Cadastro de Usuário**
<p align="center">
    <img src="https://github.com/ejailes/Projetos_Livres/blob/master/WEB_SYS_Angular_ERP/img/01.png" width="900" height="500">
</p>

**Cadastro de Empresa**
<p align="center">
    <img src="https://github.com/ejailes/Projetos_Livres/blob/master/WEB_SYS_Angular_ERP/img/02.png" width="900" height="500">
</p>

**Modulo Financeiro Lançamentos**
<p align="center">
    <img src="https://github.com/ejailes/Projetos_Livres/blob/master/WEB_SYS_Angular_ERP/img/03.png" width="900" height="500">
</p>

