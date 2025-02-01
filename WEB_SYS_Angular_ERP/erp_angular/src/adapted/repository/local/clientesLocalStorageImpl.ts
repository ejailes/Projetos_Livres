import { Cliente } from "src/dominio/core/entity/cliente";
import { Clientes } from "src/dominio/core/repository/clientes";

export class ClientesLocalStorageImpl implements Clientes {

    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    novo(cliente: Cliente): void {

        this.checkStorage();

        if (this.clienteExist(cliente)) {
            throw new Error(`Cliente com CPF / CNPJ ${cliente.cpf_cnpj} já cadastrado!`);
        }

        let clientes = this.gerarId(cliente);
        this.setLocalStorage(clientes);

    }

    atualizar(clienteNew: Cliente): void {

        this.checkStorage();

        let clientes = this.todos()
            .map(cliente => {
                if (cliente.getID() == clienteNew.getID()) {
                    cliente.nome = clienteNew.nome;
                }
                return cliente;
            });

        this.setLocalStorage(clientes);

    }

    private gerarId(cliente: Cliente): Cliente[] {

        let clientes = this.todos();
        if (clientes.length < 1) {
            cliente.setID(1);
            clientes.push(cliente);

        } else {

            let lastId = clientes.slice(-1)[0].getID();
            cliente.setID(lastId + 1);
            clientes.push(cliente);
        }

        return clientes;
    }

    private clienteExist(cliente: Cliente): boolean {

        let clienteTemp = this.buscarPorCpfCnpj(cliente.cpf_cnpj);
        return clienteTemp.cpf_cnpj === cliente.cpf_cnpj;
    }

    private checkStorage() {
        if (!this.storage) {
            throw new Error("Navegador não suporta gravação Storage!");
        }
    }

    private setLocalStorage(clientes: Cliente[]) {
        this.storage.setItem("erp.angular.db.clientes", JSON.stringify(clientes));
    }

    todasPorIDEmpresa(id: number): Cliente[] {
        let clientes = this.todos()
            .filter(clientes => clientes.getIDEmpresa() === id)
            .map((clientes) => clientes);

        return clientes;
    }

    buscarPorCpfCnpj(cpf_cnpj: string): Cliente {

        let clienteTemp = new Cliente("", "");
        const clientes = this.todos();

        for (let cliente of clientes) {
            if (cliente.cpf_cnpj === cpf_cnpj) {
                clienteTemp = cliente;
                break;
            }
        }

        return clienteTemp;

    }

    porId(id: number): Cliente {

        let clienteTemp = new Cliente("", "");
        const clientes = this.todos();

        for (let cliente of clientes) {
            if (cliente.getID() === id) {
                clienteTemp = cliente;
                break;
            }
        }

        return clienteTemp;
    }

    excluir(idCliente: number): void {

        this.clienteNotExist(idCliente);

        let clientes = this.todos()
            .filter(cliente => cliente.getID() !== idCliente)
            .map(cliente => cliente);
        this.setLocalStorage(clientes);
    }

    private clienteNotExist(id: number): void {

        if (!this.porId(id)) {
            throw new Error(`Cliente com ID: ${id} não encontrada`);
        }

    }

    todos(): Cliente[] {

        let clientes: Cliente[] = [];

        let lista = this.storage.getItem("erp.angular.db.clientes");
        if (!lista) {
            return clientes;
        }

        let clientesTemp = JSON.parse(lista);
        for (let cliente of clientesTemp) {
            let clienteTemp = new Cliente(cliente.nome, cliente.cpf_cnpj);
            clienteTemp.setID(cliente.id);
            clienteTemp.setIDEmpresa(cliente.id_empresa);
            clienteTemp.setTipo(cliente.tipo);
            clientes.push(clienteTemp);
        }

        return clientes;
    }

}