import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { ContaOUT } from "../../ports/io/conta_IO";
import { LancamentoOUT } from "../../ports/io/lancamento_IO";
import { Service } from "../../service";
import { LancamentoConverter } from "../../ports/converters/lancamentoConverter";
import { Pagination } from "../../ports/io/pagination_IO";

type PesquisaLazyType = Omit<PesquisaLazy, "execute">;

export class PesquisaLazy implements Service<Pagination<LancamentoOUT[]>> {

    private conta?: ContaOUT;
    private pagination?: Pagination<LancamentoOUT[]>;

    private constructor(private repoLancamento: Lancamentos, private conveter: LancamentoConverter) {

    }

    public setConta(conta: ContaOUT) {
        this.conta = conta;
        return this as PesquisaLazyType;
    }

    public setPagination(pagination: Pagination<LancamentoOUT[]>) {
        this.pagination = pagination;
        return this as PesquisaLazyType;
    }

    public create(): Service<Pagination<LancamentoOUT[]>> {
        return this;
    }

    execute(): Pagination<LancamentoOUT[]> {

        if (!this.conta) {
            throw new Error("Não existe Conta para pesquisar os Lançamentos Associados!!!");
        }

        if (!this.pagination) {
            throw new Error("Paginação não informada!!!");
        }
 
        const lancamentos = this.repoLancamento.todosPorIdConta(this.conta.getId());
        this.pagination.setValue(this.conveter.toListLancamentoOUT(lancamentos));
        
        return this.pagination;
    }

    public static builder(repoLancamentos: Lancamentos, converter: LancamentoConverter) {
        return new PesquisaLazy(repoLancamentos, converter) as PesquisaLazyType;
    }

}