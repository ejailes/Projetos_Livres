import { RepositoryFactory } from "src/dominio/factories/repositoryFactory";
import { Empresas } from "src/dominio/core/repository/empresas";
import { EmpresaIN, EmpresaOUT } from "../core/service/ports/io/empresa_IO";
import { EmpresaConverter } from "../core/service/ports/converters/empresaConverter";
import { ConverterFactory } from "../factories/converterFactory";
import { UsuarioOUT } from "../core/service/ports/io/usuario_IO";
import { EmpresaServices } from "../core/service/empresa/empresaServices";

export class EmpresaController {

    private repo: Empresas;
    private converter: EmpresaConverter;

    constructor(repo: RepositoryFactory, converters: ConverterFactory) {
        this.repo = repo.getRepositoryEmpresas();
        this.converter = converters.getConverterEmpresa();
    }

    public nova(empresa: EmpresaIN): void {

        const service = EmpresaServices.nova(this.repo, this.converter)
            .setEmpresa(empresa)
            .create();

        service.execute();
    }

    public atualizar(empresa: EmpresaOUT): void {

        const service = EmpresaServices.atualizar(this.repo, this.converter)
            .setEmpresa(empresa)
            .create();

        service.execute();
    }

    public delete(empresa: EmpresaOUT) {

        const service = EmpresaServices.deletar(this.repo)
            .setEmpresa(empresa)
            .create();

        service.execute();
    }

    public todasPorEmaildoUsuario(usuario: UsuarioOUT): EmpresaOUT[] {

        const service = EmpresaServices.todasPorEmailUsuario(this.repo, this.converter)
            .setUsuario(usuario)
            .create();

        return service.execute();
    }

    public pesquisarPorID(id: number): EmpresaOUT {

        const service = EmpresaServices.pesquisarPorID(this.repo, this.converter)
            .setId(id)
            .create();

        return service.execute();
    }

    public pesquisarPorCNPJ(cnpj: string): EmpresaOUT {

        const service = EmpresaServices.pesquisarPorCNPJ(this.repo, this.converter)
            .setCNPJ(cnpj)
            .create();

        return service.execute();
    }
}