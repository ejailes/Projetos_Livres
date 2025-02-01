import { Service } from "../service";
import { HandlerNotificacao } from "../notificacao";
import { Authorizations } from "src/dominio/core/repository/authorizations";

type LogoutType = Omit<Logout, "execute">;

class Logout implements Service<void> {

    private constructor(private repo: Authorizations, private handlerNotificacao: HandlerNotificacao) {

    }

    public create(): Service<void>{
        return this;
    }

    execute(): void {
        this.repo.logout();
        this.handlerNotificacao.execute();
    }

    public static builder(repo: Authorizations, handlerNotificacao: HandlerNotificacao) {
        return new Logout(repo, handlerNotificacao) as LogoutType;
    }

}

export const auth_logout = Logout.builder;
