import { Contas } from "src/dominio/core/repository/contas";
import { Service } from "../../service";
import { ContaIN } from "../../ports/io/conta_IO";
import { ContaConverter } from "../../ports/converters/contaConverter";

type NovaType = Omit<Nova, "execute">;

class Nova implements Service<void> {

    private conta?: ContaIN;

    private constructor(private repoContas: Contas, private converter:ContaConverter) {

    }

    public setConta(conta: ContaIN) {
        this.conta = conta;
        return this as NovaType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {

        if (!this.conta) {
            throw new Error("Não existe Conta para salvar!!!");
        }

        this.repoContas.nova(this.converter.toConta(this.conta));

    }

    public static builder(repoContas: Contas, converter:ContaConverter){
        return new Nova(repoContas, converter) as NovaType;
    }

}

export const conta_nova = Nova.builder;