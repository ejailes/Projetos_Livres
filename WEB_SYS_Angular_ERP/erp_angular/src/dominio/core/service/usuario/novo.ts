import { Usuarios } from "src/dominio/core/repository/usuarios";
import { Service } from "../service";
import { Usuario } from "src/dominio/core/entity/usuario";
import { UsuarioIN } from "../ports/io/usuario_IO";

type NovoType = Omit<Novo, "execute">;

class Novo implements Service<void> {

    private usuario?: UsuarioIN;

    private constructor(private repo: Usuarios) {
    }

    public setUsuario(usuario: UsuarioIN) {
        this.usuario = usuario;
        return this as NovoType;
    }

    public getService(): Service<void> {
        return this;
    }

    execute(): void { 

        if (!this.usuario) {
            throw new Error("Não existe usuario para salvar!!!");
        }

        let usuario: Usuario = new Usuario(this.usuario.getNome(), this.usuario.getEmail());
        usuario.setPassword(this.usuario.getPassword());

        this.repo.criar(usuario);

    }

    public static builder(repo: Usuarios) {
        return new Novo(repo) as NovoType;
    }

}

export const usuario_novo = Novo.builder;