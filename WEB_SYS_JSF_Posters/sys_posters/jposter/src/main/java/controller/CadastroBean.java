package controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import exception.NegocioException;
import model.Permissao;
import model.PermissaoUsuario;
import model.Permissoes;
import model.Usuario;
import service.UsuarioService;

@Named
@RequestScoped
public class CadastroBean implements Serializable {

	private static final long serialVersionUID = 1L;

	@Inject
	private Usuario usuario;

	@Inject
	private UsuarioService usuarioService;

	public Usuario getUsuario() {
		return this.usuario;
	}

	@Transactional
	public String salvar() {

		try {

			List<PermissaoUsuario> listaPer = new ArrayList<PermissaoUsuario>();
			listaPer.add(new PermissaoUsuario(usuario, new Permissao(Permissoes.USUARIO)));

			this.usuario.setPermissoes(listaPer);
			this.usuarioService.cadastrar(this.usuario);

		} catch (NegocioException e) {

			FacesContext.getCurrentInstance().addMessage(null,
					new FacesMessage(FacesMessage.SEVERITY_ERROR, e.getMessage(), null));

			return null;
		}

		return "/login?faces-redirect=true";
	}
}
