import { Empresas } from "src/dominio/core/repository/empresas";
import { Service } from "../service";
import { EmpresaIN } from "../ports/io/empresa_IO";
import { EmpresaConverter } from "../ports/converters/empresaConverter";

type NovaType = Omit<Nova, "execute">;

class Nova implements Service<void> {

    private empresa?: EmpresaIN;

    private constructor(private repoEmpresas: Empresas, private converter: EmpresaConverter) {

    }

    public setEmpresa(empresa: EmpresaIN) { 
        this.empresa = empresa;
        return this as NovaType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {

        if (!this.empresa) {
            throw new Error("Não existe empresa para salvar!!!");
        }

        let empresa = this.converter.toEmpresa(this.empresa);
        this.repoEmpresas.nova(empresa);

    }

    public static builder(repoEmpresas: Empresas, converter: EmpresaConverter){
        return new Nova(repoEmpresas, converter) as NovaType;
    }

} 

export const empresa_nova = Nova.builder;