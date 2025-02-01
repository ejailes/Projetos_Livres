import { Usuario } from "src/dominio/core/entity/usuario";
import { Usuarios } from "src/dominio/core/repository/usuarios";

export class UsuariosLocalStorageImpl implements Usuarios {

    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    criar(usuario: Usuario): void {

        if (!this.storage) {
            throw new Error("Navegador não suporta gravação Storage!");
        }

        this.usuarioExist(usuario.email);
        let usuarios = this.todos();
        usuarios.push(usuario);
        this.setLocalStorage(usuarios);

    }

    private setLocalStorage(usuarios: Usuario[]) {
        this.storage.setItem("erp.angular.db", JSON.stringify(usuarios));
    }

    private usuarioExist(email: string) {
        let usuario = this.buscarPorEmail(email);
        if (usuario.email === email) {
            throw new Error(`Usuário com email ${email} já cadastrado!`);
        }
    }

    public todos(): Usuario[] {

        let usuarios: Usuario[] = [];
        let lista = this.storage.getItem("erp.angular.db");
        if (!lista) {
            return usuarios;
        }

        let usuariosTemp = JSON.parse(lista);
        for (let usuario of usuariosTemp) {
            let usuarioTemp = new Usuario(usuario.nome, usuario.email);
            usuarioTemp.setPassword(usuario.password);

            usuarios.push(usuarioTemp);
        }

        return usuarios;
    }

    buscarPorEmail(email: string): Usuario {

        let usuarioTemp: Usuario = new Usuario("", "");
        const usuarios = this.todos();

        for (let usuario of usuarios) {
            if (usuario.email === email) {
                usuarioTemp = usuario;
                break;
            }
        }

        return usuarioTemp;
    }

}