import { Empresas } from "../../repository/empresas";
import { Service } from "../service";
import { EmpresaOUT } from "../ports/io/empresa_IO";
import { EmpresaConverter } from "../ports/converters/empresaConverter";

type PesquisarPorIDType = Omit<PesquisarPorID, "execute">;

class PesquisarPorID implements Service<EmpresaOUT> {

    private id: number = 0;

    private constructor(private repoEmpresas: Empresas, private converter: EmpresaConverter) {

    }

    public setId(id: number) {
        this.id = id;
        return this as PesquisarPorIDType;
    }

    private getEmpresa(empresa: EmpresaOUT) {
        if (!empresa) {
            throw new Error("Não existe Empresa");
        }

        return empresa;
    }

    public create(): Service<EmpresaOUT>{
        return this;
    }

    execute(): EmpresaOUT {

        if (this.id <= 0) {
            throw new Error("ID não informado.");
        }

        let empresa = this.repoEmpresas.buscarPorId(this.id);
        return this.getEmpresa(this.converter.toEmpresaOUT(empresa));

    }

    public static builder(repoEmpresas: Empresas, converter: EmpresaConverter){
        return new PesquisarPorID(repoEmpresas,converter) as PesquisarPorIDType;
    }

}

export const empresa_pesquisarPorID = PesquisarPorID.builder;