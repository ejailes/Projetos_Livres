import { Cliente } from "src/dominio/core/entity/cliente";
import { ClienteOUT } from "src/dominio/core/service/ports/io/cliente_IO";
import { ClienteConverter } from "src/dominio/core/service/ports/converters/clienteConverter";
import { ClienteOUTImpl } from "../dto/clienteDTO";

export class ClienteConverterImpl implements ClienteConverter {

    toCliente(cliente: ClienteOUT): Cliente {

        let clienteConverter = new Cliente(cliente.getNome(), cliente.getCpf_Cnpj());
        clienteConverter.setID(cliente.getID());
        clienteConverter.setIDEmpresa(cliente.getIDEmpresa());
        clienteConverter.setTipo(cliente.getTipo());

        return clienteConverter;

    }

    toListClienteOUT(clientes: Cliente[]): ClienteOUT[] {

        let clientesTemp: ClienteOUT[] = [];
        for (let cliente of clientes) {
            clientesTemp.push(this.toClienteOUT(cliente));
        }
        return clientesTemp;
    }

    toClienteOUT(cliente: Cliente): ClienteOUT {

        let clienteOUT = new ClienteOUTImpl(cliente.getID(), cliente.getIDEmpresa());
        clienteOUT.setCpf_Cnpj(cliente.cpf_cnpj);
        clienteOUT.setNome(cliente.nome);
        clienteOUT.setTipo(cliente.getTipo());

        return clienteOUT;
    }
}