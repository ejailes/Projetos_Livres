package service;

import java.util.List;

import javax.enterprise.inject.Model;
import javax.inject.Inject;
import javax.transaction.Transactional;

import exception.NegocioException;
import model.PermissaoUsuario;
import model.Usuario;
import model.UsuarioDTO;
import repository.Usuarios;
import util.MD5Utils;
import util.Repositorios;

@Model
public class UsuarioService {

	@Inject
	private Repositorios repositorios;

	@Transactional
	public void cadastrar(Usuario usuario) throws NegocioException {

		this.checkEmailUsuario(usuario.getEmail());
		this.encryptPass(usuario);

	}

	private void checkEmailUsuario(String email) throws NegocioException {

		Usuarios usuarios = this.repositorios.getUsuarios();

		if (!email.isEmpty() && usuarios.porEmail(email) != null) {

			throw new NegocioException("Já Existe Usuário com esse E-mail");

		}

	}

	private void encryptPass(Usuario usuario) {

		usuario.setPassword(MD5Utils.encrypt(usuario.getPassword()));
		this.repositorios.getUsuarios().novo(usuario);
		// this.repositorios.getUsuarios().atualizarDados(usuarioDTO);
	}

	public List<Usuario> listaDeUsuarios(Usuario usuario) {
		return this.repositorios.getUsuarios().todosComExcecao(usuario);
	}

	public List<PermissaoUsuario> listaDePermissoesUsuario(Usuario usuario) {
		return this.repositorios.getUsuarios().permissoes(usuario);
	}

	@Transactional
	public void updatePermissoes(Usuario usuario) {

		this.repositorios.getUsuarios().atualizarPermissoes(usuario);
	}

	public boolean notExistUserAdmin() {
		
		int qtdUserAdmin = this.repositorios.getUsuarios().quantidadeDeUsuariosAdmin();
		System.out.println("Quantidade de User: " + qtdUserAdmin);
		return qtdUserAdmin == 0;

	}

	
	@Transactional
	public boolean atualizarPerfilUsuario(UsuarioDTO usuarioDTO, String email) throws NegocioException {

		boolean alterEmail = false;

		if (usuarioDTO != null) {

			if (!(usuarioDTO.getEmail().equals(email))) {

				this.checkEmailUsuario(usuarioDTO.getEmail());
				alterEmail = true;
			}

			this.repositorios.getUsuarios().atualizarDados(usuarioDTO);

		}

		return alterEmail;

	}

	@Transactional
	public void atualizarSenhaUsuario(Usuario usuario) {

		usuario.setPassword(MD5Utils.encrypt(usuario.getPassword()));
		this.repositorios.getUsuarios().atualizarSenha(usuario);
	}

	@Transactional
	public void deletar(Usuario usuario) {
		this.repositorios.getUsuarios().deletar(usuario);

	}

}
