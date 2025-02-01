import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { LancamentoOUT } from "../../ports/io/lancamento_IO";
import { Service } from "../../service";
import { LancamentoConverter } from "../../ports/converters/lancamentoConverter";
import { ContaOUT } from "../../ports/io/conta_IO";

type TodosPorIdContaType = Omit<TodosPorIdConta, "execute">;

export class TodosPorIdConta implements Service<LancamentoOUT[]> {

    private conta?: ContaOUT;

    private constructor(private repoLancamento: Lancamentos, private conveter: LancamentoConverter) {

    } 

    public setConta(conta: ContaOUT) {
        this.conta = conta;
        return this as TodosPorIdContaType;
    }

    public create(): Service<LancamentoOUT[]> {
        return this;
    }

    execute(): LancamentoOUT[] {

        if (!this.conta) {
            throw new Error("Não existe Conta para pesquisar os Lançamentos Associados!!!");
        }

        return this.conveter.toListLancamentoOUT(this.repoLancamento.todosPorIdConta(this.conta.getId()));
    }

    public static builder(repoLancamentos: Lancamentos, converter: LancamentoConverter) {
        return new TodosPorIdConta(repoLancamentos, converter) as TodosPorIdContaType;
    }

}