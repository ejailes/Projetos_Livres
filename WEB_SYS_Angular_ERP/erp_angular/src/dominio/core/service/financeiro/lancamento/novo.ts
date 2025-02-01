import { Lancamentos } from "src/dominio/core/repository/lancamentos";
import { Service } from "../../service";
import { LancamentoIN } from "../../ports/io/lancamento_IO";
import { LancamentoConverter } from "../../ports/converters/lancamentoConverter";

type NovoType = Omit<Novo, "execute">;

export class Novo implements Service<void> {

    private lancamento?:LancamentoIN;

    private constructor(private repoLancamentos:Lancamentos, private conveter:LancamentoConverter){

    }

    public setLancamento(lancamento: LancamentoIN){
        this.lancamento = lancamento;
        return this as NovoType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {

        if (!this.lancamento) {
            throw new Error("Não existe lancamento para salvar");
        }
        this.repoLancamentos.novo(this.conveter.toLancamento(this.lancamento));
    }
 
    public static builder(repoLancamentos:Lancamentos, converter:LancamentoConverter){
        return new Novo(repoLancamentos, converter) as NovoType;
    }

}
