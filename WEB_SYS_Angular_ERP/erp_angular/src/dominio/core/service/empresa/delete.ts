import { Empresas } from "src/dominio/core/repository/empresas";
import { Service } from "../service";
import { EmpresaOUT } from "../ports/io/empresa_IO";

type DeleteType = Omit<Delete, "execute">;

class Delete implements Service<void> {
    private empresa?: EmpresaOUT;

    private constructor(private repoEmpresas: Empresas) {

    }

    public setEmpresa(empresa: EmpresaOUT) {
        this.empresa = empresa;
        return this as DeleteType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {

        if (!this.empresa) {
            throw new Error("Não existe empresa para deletar!!!");
        }

        this.repoEmpresas.deletarPorCnpj(this.empresa.getCnpj());
    }

    public static builder(repoEmpresas: Empresas){
        return new Delete(repoEmpresas) as DeleteType;
    }
}

export const empresa_deletar = Delete.builder;