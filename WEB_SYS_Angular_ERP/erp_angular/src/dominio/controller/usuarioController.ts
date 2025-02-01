import { RepositoryFactory } from "src/dominio/factories/repositoryFactory";
import { Usuarios } from "src/dominio/core/repository/usuarios";
import { UsuarioIN } from "../core/service/ports/io/usuario_IO";
import { UsuarioServices } from "../core/service/usuario/usuarioServices";

export class UsuarioController {

    private repo: Usuarios;

    constructor(repo: RepositoryFactory) {
        this.repo = repo.getRepositoryUsuarios();
    }

    public novo(usuario: UsuarioIN): void {
        
        const service = UsuarioServices.novo(this.repo)
            .setUsuario(usuario)
            .getService();

        service.execute();
    }
}