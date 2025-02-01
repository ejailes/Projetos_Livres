import { Usuario } from "src/dominio/core/entity/usuario";
import { UsuarioIN, UsuarioOUT } from "../io/usuario_IO";

export interface AuthConverter {

    toUsuario(usuario: UsuarioIN): Usuario;
    toUsuarioOUT(usuario: Usuario): UsuarioOUT;

} 