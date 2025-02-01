import { Empresas } from "src/dominio/core/repository/empresas";
import { Service } from "../service";
import { UsuarioOUT } from "../ports/io/usuario_IO";
import { EmpresaOUT } from "../ports/io/empresa_IO";
import { EmpresaConverter } from "../ports/converters/empresaConverter";

type TodasPorEmailDoUsuarioType = Omit<TodasPorEmailDoUsuario, "execute">;

class TodasPorEmailDoUsuario implements Service<EmpresaOUT[]> {

    private usuario?: UsuarioOUT;
    private empresas: EmpresaOUT[] = [];

    private constructor(private repoEmpresas: Empresas, private converter: EmpresaConverter) {

    }

    public setUsuario(usuario: UsuarioOUT) {
        this.usuario = usuario;
        return this as TodasPorEmailDoUsuarioType;
    }

    private getEmpresas(): EmpresaOUT[] {
        return this.empresas;
    }

    public create(): Service<EmpresaOUT[]>{
        return this;
    }

    execute(): EmpresaOUT[] {

        this.todasPorEmaildoUsuario();
        return this.getEmpresas();
    }

    private todasPorEmaildoUsuario() {

        if (!this.usuario) {
            throw new Error("Não existe usuario para pesquisar a empresa(s) associada(s)!!!");
        }

        let emailUsuario = this.usuario.getEmail();
        
        let empresas = this.repoEmpresas.todasPorEmailDoUsuario(emailUsuario);
        for (let empresa of empresas) {
            this.empresas.push(this.converter.toEmpresaOUT(empresa));
        }

    }

    public static builder(repoEmpresas: Empresas, converter: EmpresaConverter){
        return new TodasPorEmailDoUsuario(repoEmpresas, converter) as TodasPorEmailDoUsuarioType;
    }
}

export const empresa_todasPorEmailDoUsuario = TodasPorEmailDoUsuario.builder;