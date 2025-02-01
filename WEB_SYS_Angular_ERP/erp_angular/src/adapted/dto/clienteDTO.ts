import { Cliente } from "src/dominio/core/entity/cliente";
import { ClienteIN, ClienteOUT } from "src/dominio/core/service/ports/io/cliente_IO";
import { EmpresaOUT } from "src/dominio/core/service/ports/io/empresa_IO";
import { ClienteTipo } from "../utils/clienteTipo";

export class ClienteINImpl implements ClienteIN {

    private nome?: string;
    private cpf_cnpj?: string;
    private empresa?: EmpresaOUT;
    private tipo?: Cliente.Tipo;

    constructor(nome: string, cpf_cnpj: string) {
        this.setCpf_Cnpj(cpf_cnpj);
        this.setNome(nome);
    }

    setEmpresa(empresa: EmpresaOUT): void {
        this.empresa = empresa;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    setCpf_Cnpj(cpf_cnpj: string): void {
        this.cpf_cnpj = cpf_cnpj;
    }

    setTipo(tipo: string): void {

        const tipoCliente = ClienteTipo.check(tipo);
        if (!tipoCliente) {
            throw new Error("Cliente com Tipo Inválido");
        }

        this.tipo =  Cliente.Tipo[tipoCliente];
    }

    getEmpresa(): EmpresaOUT {
        if (!this.empresa) {
            throw new Error("Cliente sem Empresa");
        }
        return this.empresa;
    }

    getNome(): string {

        if (!this.nome) {
            throw new Error("Cliente sem Nome");
        }

        return this.nome;
    }
    getCpf_Cnpj(): string {

        if (!this.cpf_cnpj) {
            throw new Error("Cliente sem CPF / CNPJ");
        }
        return this.cpf_cnpj;
    }

    getTipo(): Cliente.Tipo {
        if (!this.tipo) {
            throw new Error("Cliente sem tipo");
        }
        return this.tipo;
    }
}

export class ClienteOUTImpl implements ClienteOUT {

    private nome?: string;
    private cpf_cnpj?: string;
    private tipo?: Cliente.Tipo;

    constructor(private id: number, private id_empresa: number){

    }
    
    setNome(nome: string): void {
        this.nome = nome;
    }

    setCpf_Cnpj(cpf_cnpj: string): void {
        this.cpf_cnpj = cpf_cnpj;
    }

    setTipo(tipo: string): void {

        const tipoCliente = ClienteTipo.check(tipo);
        if (!tipoCliente) {
            throw new Error("Cliente com Tipo Inválido");
        }

        this.tipo = Cliente.Tipo[tipoCliente];
    }

    getID(): number {

        if (!this.id) {
            throw new Error("Cliente sem ID");
        }
        return this.id;
    }

    getIDEmpresa(): number {

        if (!this.id_empresa) {
            throw new Error("Cliente sem Empresa Associada");
        }

        return this.id_empresa;
    }

    getCpf_Cnpj(): string {

        if (!this.cpf_cnpj) {
            throw new Error("Cliente sem CPF / CNPJ");
        }

        return this.cpf_cnpj;

    }

    getNome(): string {

        if (!this.nome) {
            throw new Error("Cliente sem Nome");
        }

        return this.nome;
    }

    getTipo(): Cliente.Tipo {
        if (!this.tipo) {
            throw new Error("Cliente sem tipo");
        }

        return this.tipo;
    }
}