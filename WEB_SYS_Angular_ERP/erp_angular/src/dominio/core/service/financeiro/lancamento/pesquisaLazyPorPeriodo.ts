import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { ContaOUT } from "../../ports/io/conta_IO";
import { LancamentoOUT } from "../../ports/io/lancamento_IO";
import { Pagination } from "../../ports/io/pagination_IO";
import { Service } from "../../service";
import { LancamentoConverter } from "../../ports/converters/lancamentoConverter";
import { IntervaloData } from "src/dominio/core/valueObject/intervaloDada";

type PesquisaLazyPorPeriodoType = Omit<PesquisaLazyPorPeriodo, "execute">;

export class PesquisaLazyPorPeriodo implements Service<Pagination<LancamentoOUT[]>> {

    private conta?: ContaOUT;
    private pagination?: Pagination<LancamentoOUT[]>;
    private periodo?: IntervaloData;

    private constructor(private repoLancamento: Lancamentos, private conveter: LancamentoConverter) {

    }

    public setConta(conta: ContaOUT) {
        this.conta = conta;
        return this as PesquisaLazyPorPeriodoType;
    }

    public setPagination(pagination: Pagination<LancamentoOUT[]>) {
        this.pagination = pagination;
        return this as PesquisaLazyPorPeriodoType;
    }

    public setPeriodo(periodo: IntervaloData) {
        this.periodo = periodo;
        return this as PesquisaLazyPorPeriodoType;
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

        if (!this.periodo) {
            throw new Error("Não existe Período para pesquisar os Lançamentos!!!");
        }

        const lancamentos = this.conveter.toListLancamentoOUT(this.repoLancamento.buscarPorIntervaloData(this.conta.getId(), this.periodo));

        if (lancamentos.length <= 0) {
            throw new Error("Não existe Lancamento(s) para pesquisar!!!");
        }

        this.pagination.setValue(lancamentos);

        return this.pagination;
    }

    public static builder(repoLancamentos: Lancamentos, converter: LancamentoConverter) {
        return new PesquisaLazyPorPeriodo(repoLancamentos, converter) as PesquisaLazyPorPeriodoType;
    }

} 