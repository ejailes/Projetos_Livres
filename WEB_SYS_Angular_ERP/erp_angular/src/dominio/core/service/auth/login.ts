import { Service } from "../service";
import { HandlerNotificacao } from "../notificacao";
import { UsuarioIN } from "../ports/io/usuario_IO";
import { Authorizations } from "src/dominio/core/repository/authorizations";
import { AuthConverter } from "../ports/converters/authConverter";

type LoginType = Omit<Login, "execute">;

class Login implements Service<void> { 

    private usuario?: UsuarioIN 

    private constructor(private repo: Authorizations, private authConverter: AuthConverter, private handlerNotificacao: HandlerNotificacao) {
    }

    public setUsuario(usuario: UsuarioIN) {
        this.usuario = usuario;
        return this as LoginType; 
    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {

        if (!this.usuario) {
            throw new Error("Não existe usuario para buscar!!!");
        }

        this.repo.login(this.authConverter.toUsuario(this.usuario));
        this.handlerNotificacao.execute();

    }

    public static builder(repo: Authorizations, authConverter: AuthConverter, handlerNotificacao: HandlerNotificacao) {
        return new Login(repo, authConverter, handlerNotificacao) as LoginType;
    }
 
}

export const auth_login = Login.builder;
