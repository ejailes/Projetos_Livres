import { Clientes } from "../core/repository/clientes";
import { ClienteIN, ClienteOUT } from "../core/service/ports/io/cliente_IO";
import { ClienteConverter } from "../core/service/ports/converters/clienteConverter";
import { EmpresaOUT } from "../core/service/ports/io/empresa_IO";
import { ConverterFactory } from "../factories/converterFactory";
import { RepositoryFactory } from "../factories/repositoryFactory";
import { ClienteServices } from "../core/service/cliente/clienteServices";

export class ClienteController {

    private repo: Clientes
    private converter: ClienteConverter

    constructor(repo: RepositoryFactory, converters: ConverterFactory) {
        this.repo = repo.getRepositoryClientes();
        this.converter = converters.getConverterCliente();
    }

    public novo(cliente: ClienteIN): void {

        const service = ClienteServices.novo(this.repo)
            .setCliente(cliente)
            .create();

        service.execute();
    }

    public todosPorEmpresa(empresa: EmpresaOUT) {

        const service = ClienteServices
            .todosPorIDEmpresa(this.repo, this.converter)
            .setEmpresa(empresa).create();

        return service.execute();
    }

    public atualizar(cliente: ClienteOUT): void {

        const service = ClienteServices
            .atualizar(this.repo, this.converter)
            .setCliente(cliente)
            .create();

        return service.execute();
    }

    public porId(id: number): ClienteOUT {

        const service = ClienteServices
            .porId(this.repo, this.converter)
            .setId(id).create();

        return service.execute();
    }

    public deletar(id: number): void {

        const service = ClienteServices
            .deletar(this.repo)
            .setId(id)
            .create();

        service.execute();
    }

}