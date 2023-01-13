package model.modelolazy;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.faces.context.ExternalContext;
import javax.inject.Inject;

import org.primefaces.model.FilterMeta;
import org.primefaces.model.LazyDataModel;
import org.primefaces.model.SortMeta;

import model.Poster;
import util.Repositorios;
import util.UsuarioUtil;

public class LazyPosterDataModel extends LazyDataModel<Poster> implements Serializable {

	private static final long serialVersionUID = 1L;
	private boolean revisao = false;

	@Inject
	private Repositorios repositorios;

	@Inject
	private ExternalContext context;

	public LazyPosterDataModel() {

	}

	@Override
	public List<Poster> load(int first, int pageSize, Map<String, SortMeta> sortBy, Map<String, FilterMeta> filterBy) {

		List<Poster> posters = null;

		if (!revisao) {
			/*
			 * Paginação para Usuário, deve mostrar apenas posters em revisão do usuário
			 * logado
			 */
			posters = this.paginacaoParaUsuario(first, pageSize);
		} else {
			/*
			 * Paginação para Usuário com Permissão de Revisão, deve mostrar todos os
			 * posters para revisão
			 */
			posters = this.paginacaoParaRevisao(first, pageSize);
		}

		return posters;

	}

	private List<Poster> paginacaoParaUsuario(int first, int pageSize) {

		UsuarioUtil usuarioUtil = (UsuarioUtil) this.context.getSessionMap().get("usuario");

		List<Poster> posters = this.repositorios.getPosters()
				.buscaComPaginacaoPorAutor(usuarioUtil.getUsuarioDTO().getUsuario(), first, pageSize);

		this.setRowCount(this.repositorios.getPosters()
				.quantidadeDePosterPorAutor(usuarioUtil.getUsuarioDTO().getUsuario()).intValue());

		return posters;
	}

	private List<Poster> paginacaoParaRevisao(int first, int pageSize) {
		
		List<Poster> posters = this.repositorios.getPosters().buscaComPaginacaoPostersNotCheckeds(first, pageSize);
		this.setRowCount(this.repositorios.getPosters().quantidadeDePostersNotChecked().intValue());

		return posters;

	}

	public void setRevisao(boolean revisao) {
		this.revisao = revisao;
	}

}
