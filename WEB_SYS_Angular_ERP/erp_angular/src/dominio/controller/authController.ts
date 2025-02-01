import { RepositoryFactory } from "src/dominio/factories/repositoryFactory";
import { Authorizations } from "src/dominio/core/repository/authorizations";
import { HandlerNotificacao } from "src/dominio/core/service/notificacao";
import { UsuarioIN, UsuarioOUT } from "../core/service/ports/io/usuario_IO";
import { AuthServices } from "../core/service/auth/authServices";
import { AuthConverter } from "../core/service/ports/converters/authConverter";
import { ConverterFactory } from "../factories/converterFactory";

export class AuthController {

    private repo: Authorizations;
    private converter: AuthConverter;

    constructor(repo: RepositoryFactory, converters: ConverterFactory, private handlerNotificacao: HandlerNotificacao) {
        this.repo = repo.getRepositoryAuthorizations(); 
        this.converter = converters.getConverterAuth();
    }

    public login(usuario: UsuarioIN): void {

        let service = AuthServices.login(this.repo, this.converter, this.handlerNotificacao)
            .setUsuario(usuario)
            .create();

        service.execute();
    }

    public logout() {

        let service = AuthServices.logout(this.repo, this.handlerNotificacao).create();
        service.execute();
    }

    public logged(): UsuarioOUT {

        let service = AuthServices.logged(this.repo, this.converter).create();
        return service.execute();

    }

}