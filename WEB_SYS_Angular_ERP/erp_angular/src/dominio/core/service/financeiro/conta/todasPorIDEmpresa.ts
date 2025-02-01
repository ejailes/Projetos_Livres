import { Contas } from "src/dominio/core/repository/contas";
import { ContaOUT } from "../../ports/io/conta_IO";
import { Service } from "../../service";
import { EmpresaOUT } from "../../ports/io/empresa_IO";
import { ContaConverter } from "../../ports/converters/contaConverter";

type TodasPorIDEmpresaType = Omit<TodasPorIDEmpresa, "execute">;

class TodasPorIDEmpresa implements Service<ContaOUT[]> {

    private empresa?: EmpresaOUT;

    private constructor(private repoContas: Contas, private converter:ContaConverter) {

    }

    public setEmpresa(empresa: EmpresaOUT) {
        this.empresa = empresa;
        return this as TodasPorIDEmpresaType;
    }

    private getContas(contas:ContaOUT[]): ContaOUT[] {

        if (!contas || contas.length <= 0) {
            throw new Error("Não existe contas para essa Empresa");
        }
        return contas;
    }

    public create(): Service<ContaOUT[]>{
        return this;
    }

    execute(): ContaOUT[] {

        if (!this.empresa) {
            throw new Error("Empresa não foi passada");
        }

        let contas = this.converter.toListContaOUT(this.repoContas.todasPorIdEmpresa(this.empresa.getId()));
        return this.getContas(contas);
    }

    public static builder(repoContas: Contas, converter:ContaConverter){
        return new TodasPorIDEmpresa(repoContas, converter) as TodasPorIDEmpresaType;
    }

}

export const conta_todasPorIDEmpresa = TodasPorIDEmpresa.builder;