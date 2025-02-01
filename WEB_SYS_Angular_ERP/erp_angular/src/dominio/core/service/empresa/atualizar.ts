import { Empresas } from "../../repository/empresas";
import { EmpresaConverter } from "../ports/converters/empresaConverter";
import { EmpresaOUT } from "../ports/io/empresa_IO";
import { Service } from "../service";

type AtualizarType = Omit<Atualizar, "execute">;

class Atualizar implements Service<void> {

    private empresa?: EmpresaOUT;

    private constructor(private repoEmpresas: Empresas, private converter: EmpresaConverter) {

    }

    public setEmpresa(empresa: EmpresaOUT) {
        this.empresa = empresa;
        return this as AtualizarType;
    
    }
    
    public create(): Service<void>{
        return this;
    }

    execute(): void {

        if (!this.empresa) {
            throw new Error("Não existe empresa para atualizar!!!");
        }

        let empresa = this.converter.toEmpresa(this.empresa);
        this.repoEmpresas.atualizar(empresa);
    }

    public static builder(repoEmpresas: Empresas, converter: EmpresaConverter){
        return new Atualizar(repoEmpresas, converter) as AtualizarType;
    } 

}

export const empresa_atualizar = Atualizar.builder;