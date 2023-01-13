package controller;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.ServletException;
import javax.transaction.Transactional;

import exception.NegocioException;
import model.PermissaoUsuario;
import model.Permissoes;
import model.Usuario;
import model.UsuarioDTO;
import service.UsuarioService;
import util.FacesMessageUtil;
import util.UsuarioUtil;

@Named
@ViewScoped
public class ConfiguracaoBean implements Serializable {

	private static final long serialVersionUID = 1L;
	private UsuarioDTO usuario;
	private Permissoes[] permissoesDoUsuario;
	private boolean editandoPerfil;
	private String emailUsuario;
	private String password;

	@Inject
	private UsuarioService usuarioService;

	public void init(UsuarioUtil usuarioUtil) {
		this.setUsuario(usuarioUtil.getUsuarioDTO());
		this.emailUsuario = this.usuario.getEmail();
		this.loaderPermissoes(this.usuario.getUsuario());
	}

	public UsuarioDTO getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioDTO usuario) {
		this.usuario = usuario;
	}

	public boolean isEditandoPerfil() {
		return editandoPerfil;
	}

	public void setEditandoPerfil(boolean editandoPerfil) {
		this.editandoPerfil = editandoPerfil;
	}

	public Permissoes[] getPermissoesDoUsuario() {

		return this.permissoesDoUsuario;

	}

	public List<Permissoes> getPermissoes() {

		return Arrays.asList(Permissoes.values());

	}

	private void loaderPermissoes(Usuario usuario) {

		List<PermissaoUsuario> permissoesDoUsuarioTemp = this.usuarioService.listaDePermissoesUsuario(usuario);

		this.permissoesDoUsuario = new Permissoes[permissoesDoUsuarioTemp.size()];

		for (int x = 0; x < this.permissoesDoUsuario.length; x++) {

			this.permissoesDoUsuario[x] = permissoesDoUsuarioTemp.get(x).getPermissao().getPermissao();
		}

	}

	@Transactional
	public String updateEditandoPerfil() {

		if (this.editandoPerfil) {

			try {

				if (this.salvarDados()) {

					UsuarioUtil utilUsuario = new UsuarioUtil();
					return utilUsuario.sair();

				}

			} catch (NegocioException | ServletException e) {

				FacesMessageUtil.templateMSG(e.getMessage(), FacesMessage.SEVERITY_ERROR);
				this.usuario.setEmail(this.emailUsuario);

				return "";

			}

		}

		this.editandoPerfil = !this.editandoPerfil;
		return "";

	}

	@Transactional
	private boolean salvarDados() throws NegocioException {

		return this.usuarioService.atualizarPerfilUsuario(this.usuario, this.emailUsuario);

	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Transactional
	private void salvarSenha(Usuario usuario) throws NegocioException {

		this.usuarioService.atualizarSenhaUsuario(usuario);

	}

	@Transactional
	public String deletarUsuario() {

		try {

			this.usuarioService.deletar(this.usuario.getUsuario());

			UsuarioUtil utilUsuario = new UsuarioUtil();
			return utilUsuario.sair();

		} catch (Exception e) {

			System.err.println("Error: " + e.getMessage());
			e.printStackTrace();
		}

		return "";
	}

	public String updatePassword() {

		try {

			Usuario user = new Usuario();
			user.setId(this.usuario.getId());
			user.setPassword(password);

			this.salvarSenha(user);

			UsuarioUtil utilUsuario = new UsuarioUtil();
			return utilUsuario.sair();

		} catch (NegocioException | ServletException e) {

			e.printStackTrace();
		}

		return "";

	}

}
