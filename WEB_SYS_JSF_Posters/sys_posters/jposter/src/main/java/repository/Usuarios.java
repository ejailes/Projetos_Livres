package repository;

import java.util.List;

import exception.NegocioException;
import model.PermissaoUsuario;
import model.Usuario;
import model.UsuarioDTO;

public interface Usuarios {

	public void novo(Usuario usuario);

	public void deletar(Usuario usuario);

	public Usuario porEmail(String email) throws NegocioException;

	public void atualizarSenha(Usuario usuario);

	public void atualizarDados(UsuarioDTO usuario);

	public List<Usuario> todos();

	public List<Usuario> todosComExcecao(Usuario usuario);

	public List<PermissaoUsuario> permissoes(Usuario usuario);
	
	public int quantidadeDeUsuariosAdmin();

	public void atualizarPermissoes(Usuario usuario);

}
