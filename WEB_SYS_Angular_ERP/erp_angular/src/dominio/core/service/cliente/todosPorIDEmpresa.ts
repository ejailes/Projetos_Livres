import { Clientes } from "../../repository/clientes";
import { ClienteOUT } from "../ports/io/cliente_IO";
import { ClienteConverter } from "../ports/converters/clienteConverter";
import { EmpresaOUT } from "../ports/io/empresa_IO";
import { Service } from "../service";

type TodosPorIDEmpresaType = Omit<TodosPorIDEmpresa, "execute">;

class TodosPorIDEmpresa implements Service<ClienteOUT[]> {

    private empresa?: EmpresaOUT;

    private constructor(private repoClientes: Clientes, private converter: ClienteConverter) {

    }

    public setEmpresa(empresa: EmpresaOUT) {
        this.empresa = empresa;
        return this as TodosPorIDEmpresaType;
    }

    public create(): Service<ClienteOUT[]>{
        return this;
    }

    execute(): ClienteOUT[] {

        if (!this.empresa) {
            throw new Error("Não existe Empresa para pesquisar a clientes associados!!!");
        }

        return this.converter.toListClienteOUT(this.repoClientes
            .todasPorIDEmpresa(this.empresa.getId()));

    }

    public static builder(repoClientes: Clientes, converter: ClienteConverter) {
        return new TodosPorIDEmpresa(repoClientes, converter) as TodosPorIDEmpresaType;
    }

}

export const cliente_todosPorIDEmpresa = TodosPorIDEmpresa.builder;


