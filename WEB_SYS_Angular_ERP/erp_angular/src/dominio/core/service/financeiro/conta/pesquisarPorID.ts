import { Contas } from "src/dominio/core/repository/contas";
import { ContaOUT } from "../../ports/io/conta_IO";
import { Service } from "../../service";
import { ContaConverter } from "../../ports/converters/contaConverter";

type PesquisarPorIDType = Omit<PesquisarPorID, "execute">;

export class PesquisarPorID implements Service<ContaOUT> {

    private id: number = 0;

    private constructor(private repoContas: Contas, private converter: ContaConverter){

    }
 
    public setId(id:number){
        this.id = id;
        return this as PesquisarPorIDType;
    }

    public create(): Service<ContaOUT>{
        return this;
    }

    execute(): ContaOUT {

        if (this.id <= 0) {
            throw new Error("Adicione um ID de Conta válido!!!");
        }

        return this.converter.toContaOUT(this.repoContas.buscarPorId(this.id));
        
    } 

    public static builder(repoContas: Contas, converter: ContaConverter){
        return new PesquisarPorID(repoContas, converter) as PesquisarPorIDType;
    }

}
