import { Authorizations } from "src/dominio/core/repository/authorizations";
import { Service } from "../service";
import { UsuarioOUT } from "../ports/io/usuario_IO";
import { AuthConverter } from "../ports/converters/authConverter";

type LoggedType = Omit<Logged, "execute">;
 
class Logged implements Service<UsuarioOUT> { 

    private constructor(private repo: Authorizations, private authConverter: AuthConverter) {

    }  

    public create(): Service<UsuarioOUT>{
        return this;
    }

    public execute(): UsuarioOUT {

        let usuario = this.authConverter.toUsuarioOUT(this.repo.logged()); 
        return usuario;
    }

    public static builder(repo: Authorizations, authConverter: AuthConverter) {
        return new Logged(repo, authConverter) as LoggedType;
    }
 
}

export const auth_logged = Logged.builder; 