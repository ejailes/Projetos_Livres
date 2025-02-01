import { Clientes } from "../../repository/clientes";
import { Service } from "../service";

type DeletarType = Omit<Deletar, "execute">;

export class Deletar implements Service<void> {

    private id: number = 0;

    private constructor(private repoClientes: Clientes) {

    }

    public setId(id: number) {
        this.id = id;
        return this as DeletarType;
    }

    public create(): Service<void> {
        return this;
    }

    execute(): void {

        if (this.id <= 0) {
            throw new Error("informe um ID");
        }

        this.repoClientes.excluir(this.id);
    }

    public static builder(repoClientes: Clientes) {
        return new Deletar(repoClientes) as DeletarType;
    }

}