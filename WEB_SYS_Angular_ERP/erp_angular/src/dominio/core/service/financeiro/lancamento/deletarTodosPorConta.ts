import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { Service } from "../../service";
import { ContaOUT } from "../../ports/io/conta_IO";

type DeletarTodosPorContaType = Omit<DeletarTodosPorConta, "execute">;

export class DeletarTodosPorConta implements Service<void> {

    private conta?: ContaOUT;

    private constructor(private repoLancamento: Lancamentos) {

    }

    public setConta(conta: ContaOUT) {
        this.conta = conta;
        return this as DeletarTodosPorContaType;
    }

    public create(): Service<void> {
        return this;
    }

    execute(): void {

        if (!this.conta) {
            throw new Error("Não existe Conta para deletar lançamentos !!!");
        }
        
        this.repoLancamento.excluirTodosPorConta(this.conta.getId());
    }

     public static builder(repoLancamentos: Lancamentos) {
            return new DeletarTodosPorConta(repoLancamentos) as DeletarTodosPorContaType;
        }
} 