import { Clientes } from "../../repository/clientes";
import { ClienteConverter } from "../ports/converters/clienteConverter";
import { ClienteOUT } from "../ports/io/cliente_IO";
import { Service } from "../service";

type PorIDType = Omit<PorID, "execute">;

export class PorID implements Service<ClienteOUT> {

    private id: number = 0;

    private constructor(private repoClientes: Clientes, private converter: ClienteConverter) {

    }

    public setId(id: number) {
        this.id = id;
        return this as PorIDType;
    }

    public create(): Service<ClienteOUT>{
        return this;
    }

    execute(): ClienteOUT {

        if (this.id <= 0) {
            throw new Error("informe um ID para pesquisa");
        }

        return this.converter.toClienteOUT(this.repoClientes.porId(this.id));
    } 

    public static builder(repoClientes: Clientes, converter: ClienteConverter){
        return new PorID(repoClientes, converter) as PorIDType;
    }

}