import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { LancamentoConverter } from "../../ports/converters/lancamentoConverter";
import { LancamentoOUT } from "../../ports/io/lancamento_IO";
import { Service } from "../../service";

type AtualizarType = Omit<Atualizar, "execute">;

export class Atualizar implements Service<void> {

    private lancamento?: LancamentoOUT;

    private constructor(private repoLancamentos: Lancamentos, private conveter: LancamentoConverter) {

    }

    public setLancamento(lancamento: LancamentoOUT) {
        this.lancamento = lancamento;
        return this as AtualizarType;
    }

    public create(): Service<void> {
        return this;
    }

    execute(): void {

        if (!this.lancamento) {
            throw new Error("Não existe lancamento para salvar");
        }

        this.repoLancamentos.atualizar(this.conveter.toLancamento(this.lancamento));
    }

    public static builder(repoLancamentos: Lancamentos, converter: LancamentoConverter) {
        return new Atualizar(repoLancamentos, converter) as AtualizarType;
    }

}