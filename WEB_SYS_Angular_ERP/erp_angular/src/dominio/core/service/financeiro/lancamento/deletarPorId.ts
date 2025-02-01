import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { Service } from "../../service";
import { LancamentoOUT } from "../../ports/io/lancamento_IO";

type DeletarPorIdType = Omit<DeletarPorId, "execute">;

export class DeletarPorId implements Service<void> {

    private lancamento?: LancamentoOUT;

    private constructor(private repoLancamento: Lancamentos){

    } 

    setLancamento(lancamento:LancamentoOUT){
        this.lancamento = lancamento;
        return this as DeletarPorIdType;
    }

    public create(): Service<void> {
        return this;
    }

    execute(): void {

        if (!this.lancamento || !this.lancamento.getId() ) {
            throw new Error("Não existe Lancamento para exclusão!!!");
        }

        this.repoLancamento.excluir(this.lancamento.getId());
    } 

    public static builder(repoLancamentos: Lancamentos) {
        return new DeletarPorId(repoLancamentos) as DeletarPorIdType;
    }

}