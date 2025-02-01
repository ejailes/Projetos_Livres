import { Enderecos } from "../../repository/enderecos";
import { Service } from "../service";

type DeletarPorIdEmpresaType = Omit<DeletarPorIdEmpresa, "execute">;

class DeletarPorIdEmpresa implements Service<void> {

    private id_empresa: number = 0;

    private constructor(private repoEnderecos: Enderecos) {

    }

    public setEndereco(id: number) {
        this.id_empresa = id;
        return this as DeletarPorIdEmpresaType;
    }

    public create(): Service<void> {
        return this;
    }

    execute(): void {

        if (this.id_empresa <= 0) {
            throw new Error("Endereço sem ID da empresa!!!");
        }

        this.repoEnderecos.deletarPorIdEmpresa(this.id_empresa);
    }

    public static builder(repoEnderecos: Enderecos) {
        return new DeletarPorIdEmpresa(repoEnderecos) as DeletarPorIdEmpresaType;
    }

}

export const endereco_deletarPorIDEmpresa = DeletarPorIdEmpresa.builder;