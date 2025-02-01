import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { Service } from "../../service";

type DeletarTodosPorClienteType = Omit<DeletarTodosPorCliente, "execute">;

export class DeletarTodosPorCliente implements Service<void> {

    private id: number = 0;

    private constructor(private repoLancamento: Lancamentos) {

    }

    public setId(id: number) {
        this.id = id;
        return this as DeletarTodosPorClienteType;
    }

    public create(): Service<void> {
        return this;
    }

    execute(): void {

        if (this.id <= 0) {
            throw new Error("informe um ID");
        }

        this.repoLancamento.excluirTodosPorCliente(this.id);
    }

    public static builder(repoLancamento: Lancamentos) {
        return new DeletarTodosPorCliente(repoLancamento) as DeletarTodosPorClienteType;
    }

} 