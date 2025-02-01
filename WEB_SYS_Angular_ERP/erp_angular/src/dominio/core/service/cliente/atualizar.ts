import { Cliente } from "../../entity/cliente";
import { Clientes } from "../../repository/clientes";
import { ClienteConverter } from "../ports/converters/clienteConverter";
import { ClienteOUT } from "../ports/io/cliente_IO";
import { Service } from "../service";

type AtualizarType = Omit<Atualizar, "execute">;

export class Atualizar implements Service<void> {

    private cliente?: ClienteOUT;

    private constructor(private repoClientes: Clientes, private converter: ClienteConverter) {

    }

    public setCliente(cliente: ClienteOUT) {
        this.cliente = cliente;
        return this as AtualizarType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {
       
        if (!this.cliente) {
            throw new Error("Não existe Cliente para Alterar!!!");
        }

        let cliente = this.converter.toCliente(this.cliente);
        this.repoClientes.atualizar(cliente);

    }

    public static builder(repoClientes: Clientes, converter: ClienteConverter) {
        return new Atualizar(repoClientes, converter) as AtualizarType;
    }

}
