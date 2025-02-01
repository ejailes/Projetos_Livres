package util;

import java.util.ArrayList;
import java.util.List;

import exception.NegocioException;
import model.Permissao;
import model.PermissaoUsuario;
import model.Permissoes;
import model.Usuario;
import service.UsuarioService;

public class CreateUserUtil {

	private final static String NOME_USUARIO = "Usuário Admin";
	private final static String EMAIL_USUARIO = "admin@gmail.com";
	private final static String SENHA_USUARIO = "abcd1234";
	
	public static void createUserAdmin(UsuarioService usuarioService) throws NegocioException {

		if (usuarioService.notExistUserAdmin()) {

			List<PermissaoUsuario> permissoes = new ArrayList<PermissaoUsuario>();
			Permissao admin = new Permissao();
			admin.setPermissao(Permissoes.ADMIN);

			Usuario user = new Usuario();
			user.setNome(NOME_USUARIO);
			user.setEmail(EMAIL_USUARIO);
			user.setPassword(SENHA_USUARIO);

			PermissaoUsuario permissaoUsuario = new PermissaoUsuario();
			permissaoUsuario.setUsuario(user);
			permissaoUsuario.setPermissao(admin);

			permissoes.add(permissaoUsuario);
			user.setPermissoes(permissoes);
			usuarioService.cadastrar(user);

		}

	}

}
