import { Enderecos } from "../core/repository/enderecos";
import { EnderecoServices } from "../core/service/endereco/enderecoServices";
import { EnderecoConverter } from "../core/service/ports/converters/enderecoConverter";
import { EmpresaOUT } from "../core/service/ports/io/empresa_IO";
import { EnderecoIN, EnderecoOUT } from "../core/service/ports/io/endereco_IO";
import { ConverterFactory } from "../factories/converterFactory";
import { RepositoryFactory } from "../factories/repositoryFactory";

export class EnderecoController {

    private repo: Enderecos;
    private converter: EnderecoConverter;

    constructor(repo: RepositoryFactory, converters: ConverterFactory) {
        this.repo = repo.getRepositoryEnderecos();
        this.converter = converters.getConverterEndereco();
    }

    public novo(empresa: EmpresaOUT, endereco: EnderecoIN): void {

        const service = EnderecoServices.novo(this.repo, this.converter)
            .setEmpresa(empresa)
            .setEndereco(endereco)
            .create();

        service.execute();
    }

    public atualizar(endereco: EnderecoOUT) {

        const service = EnderecoServices.atualizar(this.repo, this.converter)
            .setEndereco(endereco)
            .create();

        service.execute();
    }

    public deletePorIdEmpresa(id: number): void {

        const service = EnderecoServices.deletar(this.repo)
            .setEndereco(id)
            .create();

        service.execute();
    }

    public porIdDaEmpresa(id: number): EnderecoOUT {

        const service = EnderecoServices.pesquisarPorIDEmpresa(this.repo, this.converter)
            .setIdEmpresa(id)
            .create();

        return service.execute();
    }

}