import { Contas } from "../core/repository/contas";
import { ContaIN, ContaOUT } from "../core/service/ports/io/conta_IO";
import { ContaConverter } from "../core/service/ports/converters/contaConverter";
import { EmpresaOUT } from "../core/service/ports/io/empresa_IO";
import { ConverterFactory } from "../factories/converterFactory";
import { RepositoryFactory } from "../factories/repositoryFactory";
import { ContaServices } from "../core/service/financeiro/conta/contaServices";

export class ContaController {

    private repo: Contas;
    private converter: ContaConverter;

    constructor(repo: RepositoryFactory, converters: ConverterFactory) {
        this.repo = repo.getRepositoryContas();
        this.converter = converters.getConverterConta();
    }

    public nova(conta: ContaIN): void {

        const service = ContaServices.nova(this.repo, this.converter)
            .setConta(conta)
            .create();

        service.execute();
    }

    public todasPorIDdaEmpresa(empresa: EmpresaOUT): ContaOUT[] {

        const service = ContaServices.todasPorIDEmpresa(this.repo, this.converter)
            .setEmpresa(empresa)
            .create();

        return service.execute();
    }

    public delete(conta: ContaOUT): void {

        const service = ContaServices.deletar(this.repo)
            .setConta(conta)
            .create();

        service.execute();
    }

    public porId(id: number) {
        const service = ContaServices.pesquisarPorID(this.repo, this.converter)
            .setId(id)
            .create();

        return service.execute();
    }

}