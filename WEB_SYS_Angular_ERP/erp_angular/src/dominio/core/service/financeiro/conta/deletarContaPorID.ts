import { Contas } from "src/dominio/core/repository/contas";
import { ContaOUT } from "../../ports/io/conta_IO";
import { Service } from "../../service";

type DeletarContaPorIDType = Omit<DeletarContaPorID, "execute">;

class DeletarContaPorID implements Service<void> {

    private conta?: ContaOUT;

    private constructor(private repoContas: Contas){

    }

    public setConta(conta: ContaOUT) {
        this.conta = conta;
        return this as DeletarContaPorIDType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {
        
        if (!this.conta) {
            throw new Error("Não existe Conta para deletar!!!");
        }
        
        this.repoContas.excluir(this.conta.getId());
    }

    public static builder(repoContas: Contas){
        return new DeletarContaPorID(repoContas) as DeletarContaPorIDType;
    }

}

export const conta_deletarPorID = DeletarContaPorID.builder;