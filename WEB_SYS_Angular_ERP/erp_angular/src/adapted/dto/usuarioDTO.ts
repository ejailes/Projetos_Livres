import { UsuarioIN, UsuarioOUT } from "src/dominio/core/service/ports/io/usuario_IO";

export class UsuarioINImpl implements UsuarioIN {

    private nome?: string

    constructor(private email: string, private password: string) {

    }

    setNome(nome: string): UsuarioIN {
        this.nome = nome;
        return this;
    }

    getNome(): string {
        if (!this.nome) {
            throw new Error("Nome não informado");
        }
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

}

export class UsuarioOUTImpl implements UsuarioOUT {

    constructor(private nome: string, private email: string) {

    }

    getNome(): string {
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

}