import { Usuario } from "src/dominio/core/entity/usuario";
import { AuthConverter } from "src/dominio/core/service/ports/converters/authConverter";
import { UsuarioIN, UsuarioOUT } from "src/dominio/core/service/ports/io/usuario_IO";
import { UsuarioINImpl, UsuarioOUTImpl } from "../dto/usuarioDTO";

export class AuthConverterImpl implements AuthConverter {

    toUsuario(usuario: UsuarioIN): Usuario {

 
        let usuarioConverter = new Usuario("", usuario.getEmail());
        usuarioConverter.setPassword(usuario.getPassword());

        return usuarioConverter;

    }
    
    toUsuarioOUT(usuario: Usuario): UsuarioOUT {

        let usuarioConverter = new UsuarioOUTImpl(usuario.nome, usuario.email);
        return usuarioConverter;

    }

}