import { EmpresaIN, EmpresaOUT, TipoEmpresaEnum } from "src/dominio/core/service/ports/io/empresa_IO";
import { EnderecoIN, EnderecoOUT } from "src/dominio/core/service/ports/io/endereco_IO";
import { UsuarioOUT } from "src/dominio/core/service/ports/io/usuario_IO";

export class EmpresaINImpl implements EmpresaIN {

    private nome?: string;
    private cnpj?: string;
    private usuario?: UsuarioOUT;
    private endereco?: EnderecoIN;
    readonly tipo = TipoEmpresaEnum.IN_EMPRESA;

    constructor(nome: string, cnpj: string) {
        this.setNome(nome);
        this.setCnpj(cnpj);
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    setCnpj(cnpj: string): void {
        this.cnpj = cnpj;
    }

    setUsuario(usuario: UsuarioOUT): void {
        this.usuario = usuario;
    }

    setEndereco(endereco?: EnderecoIN): void {
        this.endereco = endereco;
    }

    getNome(): string {
        if (!this.nome) {
            throw new Error("Empresa sem nome");
        }
        return this.nome;
    }

    getCnpj(): string {
        if (!this.cnpj) {
            throw new Error("Empresa sem CNPJ");
        }
        return this.cnpj;
    }

    getUsuario(): UsuarioOUT {
        if (!this.usuario) {
            throw new Error("Empresa sem Usuario associado");
        }
        return this.usuario;
    }

    getEndereco(): EnderecoIN {
        if (!this.endereco) {
            throw new Error("Empresa sem Endereço");
        }
        return this.endereco;
    }

}

export class EmpresaOUTImpl implements EmpresaOUT {

    private id?: number;
    private nome?: string;
    private cnpj?: string;
    private idUsuario?: string;
    private endereco?: EnderecoOUT;
    readonly tipo = TipoEmpresaEnum.OUT_EMPRESA;

    constructor(id: number, nome: string, cnpj: string) {
        this.setId(id);
        this.setNome(nome);
        this.setCnpj(cnpj);
    }

    setId(id: number): void {
        this.id = id;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    setCnpj(cnpj: string): void {
        this.cnpj = cnpj;
    }

    setEndereco(endereco: EnderecoOUT): void {
        this.endereco = endereco;
    }

    setIDUsuario(idUsuario: string): void {
        this.idUsuario = idUsuario;
    }


    getId(): number {
        if (!this.id) {
            throw new Error("Empresa sem Id");
        }
        return this.id;
    }

    getNome(): string {
        if (!this.nome) {
            throw new Error("Empresa sem Nome");
        }
        return this.nome;
    }

    getCnpj(): string {
        if (!this.cnpj) {
            throw new Error("Empresa sem CNPJ");
        }
        return this.cnpj;
    }

    getEndereco(): EnderecoOUT {
        if (!this.endereco) {
            throw new Error("Empresa sem Endereço");
        }
        return this.endereco;
    }

    getIDUsuario(): string {
        if (!this.idUsuario) {
            throw new Error("Empresa sem ID de usuário");
        }
        
        return this.idUsuario;
    }

}