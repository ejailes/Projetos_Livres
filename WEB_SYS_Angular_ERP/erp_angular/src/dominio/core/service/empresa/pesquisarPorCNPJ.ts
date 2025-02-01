import { Empresas } from "../../repository/empresas";
import { Service } from "../service";
import { EmpresaOUT } from "../ports/io/empresa_IO";
import { EmpresaConverter } from "../ports/converters/empresaConverter";

type PesquisarPorCNPJType = Omit<PesquisarPorCNPJ, "execute">;

class PesquisarPorCNPJ implements Service<EmpresaOUT> {

    private cnpj?:string;

    private constructor(private repoEmpresas: Empresas, private converter: EmpresaConverter) {

    }

    public setCNPJ(cnpj: string) {
        this.cnpj = cnpj;
        return this as PesquisarPorCNPJType;
    }

    private getEmpresa(empresa:EmpresaOUT): EmpresaOUT {

        if (!empresa || empresa.getCnpj() !== this.cnpj) {
            throw new Error("Não existe Empresa com esse CNPJ!!!");
        }

        return empresa;
    }

    public create(): Service<EmpresaOUT>{
        return this;
    }

    execute(): EmpresaOUT {

        if (!this.cnpj) {
            throw new Error("Não existe CNPJ para pesquisar!!!");
        }

        let empresa = this.repoEmpresas.buscarPorCnpj(this.cnpj);
        return this.getEmpresa(this.converter.toEmpresaOUT(empresa));
    }

    public static builder(repoEmpresas: Empresas, converter: EmpresaConverter){
        return new PesquisarPorCNPJ(repoEmpresas, converter) as PesquisarPorCNPJType;
    }

} 

export const empresa_pesquisarPorCNPJ = PesquisarPorCNPJ.builder;