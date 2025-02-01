package controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.context.ExternalContext;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import model.Permissao;
import model.PermissaoUsuario;
import model.Permissoes;
import model.Usuario;
import service.UsuarioService;
import util.UsuarioUtil;

@Named
@ViewScoped
public class UsuariosBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private Permissoes[] permissaoSelecionada;

	private Usuario usuarioSelecionado;

	// Todos Usuarios com exceção do logado
	private List<Usuario> usuarios;

	@Inject
	private ExternalContext context;

	@Inject
	private UsuarioService usuarioService;

	@PostConstruct
	private void initUsuarios() {

		this.loaderUsuarios();

	}
	
	private void loaderUsuarios() {
		
		UsuarioUtil usuarioUtil = (UsuarioUtil) this.context.getSessionMap().get("usuario");
		this.usuarios = this.usuarioService.listaDeUsuarios(usuarioUtil.getUsuarioDTO().getUsuario());
	}

	public void setUsuarioSelecionado(Usuario usuario) {

		this.usuarioSelecionado = usuario;
		loaderPermissoes();

	}

	private void loaderPermissoes() {

		List<PermissaoUsuario> permissoesDoUsuario = this.usuarioService
				.listaDePermissoesUsuario(this.usuarioSelecionado);

		
		this.permissaoSelecionada = new Permissoes[permissoesDoUsuario.size()];

		for (int x = 0; x < this.permissaoSelecionada.length; x++) {

			this.permissaoSelecionada[x] = permissoesDoUsuario.get(x).getPermissao().getPermissao();
		}
		
	}

	public Usuario getUsuarioSelecionado() {
		return this.usuarioSelecionado;
	}

	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	@Transactional
	public void removerUsuario(Usuario usuario) {
		this.usuarioService.deletar(usuario);
		this.usuarioSelecionado = null;
		this.loaderUsuarios();
		
	}

	@Transactional
	public void updatePermissoes() {

		this.usuarioSelecionado.setPermissoes(loaderPermissaoes(this.permissaoSelecionada));
		this.usuarioService.updatePermissoes(this.usuarioSelecionado);
	
	}

	public List<Permissoes> getPermissoes() {

		return Arrays.asList(Permissoes.values());

	}

	public Permissoes[] getPermissaoSelecionada() {

		return this.permissaoSelecionada;

	}

	public void setPermissaoSelecionada(Permissoes[] permissaoSelecionada) {

		this.permissaoSelecionada = permissaoSelecionada;

	}

	private List<PermissaoUsuario> loaderPermissaoes(Permissoes[] permissaoSelecionada) {

		List<PermissaoUsuario> listaPer = new ArrayList<PermissaoUsuario>();

		for (int x = 0; x < permissaoSelecionada.length; x++) {
			listaPer.add(new PermissaoUsuario(this.usuarioSelecionado, new Permissao(permissaoSelecionada[x])));
		}

		return listaPer;
	}

}
