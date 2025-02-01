import { UsuarioOUTImpl } from "src/adapted/dto/usuarioDTO";
import { Usuario } from "src/dominio/core/entity/usuario";
import { Authorizations } from "src/dominio/core/repository/authorizations";
import { Usuarios } from "src/dominio/core/repository/usuarios";
import { UsuarioOUT } from "src/dominio/core/service/ports/io/usuario_IO";

export class RepositoryAuthLocalStorageImpl implements Authorizations {

    private storage: Storage;
    private session: Storage;

    constructor(private repoUsuarios: Usuarios) {
        this.storage = window.localStorage;
        this.session = window.sessionStorage;
    }

    public login(usuario: Usuario): void {

        if (!this.storage) {
            throw new Error("Navegador não suporta leitura Storage!");
        }

        const usuarioOut = this.matchPassword(usuario.email, usuario.getPassword());
        this.setSession(usuarioOut);

    }

    private matchPassword(email: string, password: string): UsuarioOUT {

        let usuario = this.repoUsuarios.buscarPorEmail(email);
        if (usuario.getPassword() !== password) {
            throw new Error("Usuario ou Senha Inválida");
        }

        return new UsuarioOUTImpl(usuario.nome, usuario.email);
    }

    private setSession(usuario: UsuarioOUT) {
        this.session.setItem("usuario", JSON.stringify(usuario));
    }

    private getSession(): string | null {
        return this.session.getItem("usuario");
    }

    public logged(): Usuario {

        const usuarioSession = this.session.getItem("usuario");
        if (!usuarioSession) {
            throw new Error("Usuario não encontrado");
        }

        let { nome, email } = JSON.parse(usuarioSession);
        const usuario = new Usuario(nome, email);

        return usuario;
    }

    public logout(): void {
        if (this.getSession()) {
            sessionStorage.removeItem("usuario");
        }
    }

}