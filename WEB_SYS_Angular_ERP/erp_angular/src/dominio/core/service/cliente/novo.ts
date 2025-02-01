import { Cliente } from "../../entity/cliente";
import { Clientes } from "../../repository/clientes";
import { ClienteIN } from "../ports/io/cliente_IO";
import { Service } from "../service";

type NovoType = Omit<Novo, "execute">;

class Novo implements Service<void> {

    private cliente?: ClienteIN

    private constructor(private repoClientes: Clientes) {

    }

    public setCliente(cliente: ClienteIN) {
        this.cliente = cliente;
        return this as NovoType;
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {

        if (!this.cliente) {
            throw new Error("Não existe Cliente para salvar!!!");
        }

        let cliente = new Cliente(this.cliente.getNome(), this.cliente.getCpf_Cnpj());
        cliente.setIDEmpresa(this.cliente.getEmpresa().getId());
        cliente.setTipo(this.cliente.getTipo());

        this.repoClientes.novo(cliente);
    }

    public static builder(repoClientes: Clientes) {
        return new Novo(repoClientes) as NovoType;
    }

}

export const cliente_novo = Novo.builder;